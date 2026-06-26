import {useState} from "react";
import {LogOut,KeyRound,Trash2} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {supabase} from "@/services/supabase/client";
import {signOut} from "@/services/supabase/auth";
import useProfileStore from "@/app/store/profileStore";

import "../styles/account-settings.css";

function AccountSettings(){

    const profile=useProfileStore(s=>s.profile);

    const[editingPassword,setEditingPassword]=useState(false);
    const[currentPassword,setCurrentPassword]=useState("");
    const[newPassword,setNewPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);

    async function savePassword(){

        setError("");

        if(newPassword!==confirmPassword){
            return setError("Passwords do not match.");
        }

        if(newPassword.length<8){
            return setError("Password must be at least 8 characters.");
        }

        setLoading(true);

        const{
            error:loginError,
        }=await supabase.auth.signInWithPassword({
            email:profile.email,
            password:currentPassword,
        });

        if(loginError){
            setLoading(false);
            return setError("Current password is incorrect.");
        }

        const{
            error:updateError,
        }=await supabase.auth.updateUser({
            password:newPassword,
        });

        setLoading(false);

        if(updateError){
            return setError(updateError.message);
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setEditingPassword(false);

    }

    async function deleteAccount(){

        await supabase.functions.invoke(
            "delete-account"
        );

        await signOut();

    }

    return(

        <section className="settings-section">

            <div className="settings-section-header">

                <h2>
                    Account
                </h2>

                <p>
                    Manage your account and security.
                </p>

            </div>

            <div className="account-card">

                {editingPassword&&(

                    <div className="password-form">

                        <Input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={e=>setCurrentPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={e=>setNewPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                        />

                        {error&&(
                            <span className="password-error">
                                {error}
                            </span>
                        )}

                    </div>

                )}

                <Button
                    variant="outline"
                    disabled={loading}
                    onClick={()=>{
                        if(!editingPassword){
                            setEditingPassword(true);
                        }else{
                            savePassword();
                        }
                    }}
                >
                    <KeyRound size={18}/>
                    {editingPassword
                        ?"Save Password"
                        :"Change Password"}
                </Button>

                <Button
                    variant="outline"
                    onClick={signOut}
                >
                    <LogOut size={18}/>
                    Log Out
                </Button>

            </div>

            <div className="danger-zone">

                <h3>
                    Danger Zone
                </h3>

                <Button
                    variant="destructive"
                >
                    <Trash2 size={18}/>
                    Delete All Boards
                </Button>

                <AlertDialog>

                    <AlertDialogTrigger asChild>

                        <Button variant="destructive">

                            <Trash2 size={18}/>
                            Delete Account

                        </Button>

                    </AlertDialogTrigger>

                    <AlertDialogContent className="alert-dialog-content">

                        <AlertDialogHeader>

                            <AlertDialogTitle>
                                Delete Account?
                            </AlertDialogTitle>

                            <AlertDialogDescription>

                                This action cannot be undone.
                                Your profile, workspaces, boards and account
                                will be permanently deleted.

                            </AlertDialogDescription>

                        </AlertDialogHeader>

                        <AlertDialogFooter>

                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={deleteAccount}
                            >
                                Delete Account
                            </AlertDialogAction>

                        </AlertDialogFooter>

                    </AlertDialogContent>

                </AlertDialog>

            </div>

        </section>

    );

}

export default AccountSettings;