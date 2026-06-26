import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/services/supabase/auth";

import { FcGoogle } from "react-icons/fc";
import '../styles/google-button.css'

function GoogleButton() {
    const [loading, setLoading] = useState(false);

    async function handleGoogleLogin() {
        if (loading) return;

        setLoading(true);

        const { error } = await signInWithGoogle();

        if (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="google-button"
            disabled={loading}
            onClick={handleGoogleLogin}
        >
            {loading ? (
                <>
                    <Loader2
                        size={18}
                        className="google-spinner"
                    />
                    Connecting to Google...
                </>
            ) : (
                <>
                    <FcGoogle size={20} />
                    Continue with Google
                </>
            )}
        </Button>
    );
}

export default GoogleButton;