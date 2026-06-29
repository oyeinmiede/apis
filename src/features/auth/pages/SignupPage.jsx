import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";
import GoogleButton from "../components/GoogleButton";
import AuthDivider from "../components/AuthDivider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/services/supabase/auth";
import "../styles/signup.css"


function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const {error} = await signUp({ email, password,});
        if (error) {
            setError(
                error.message
            );
            setLoading(false);
            return;
        }
        navigate(`/verify-email?email=${email}`);
    }

    return (
        <AuthLayout mode="signup">
            <AuthModal>
                <h1>Your hive is ready</h1>
                <p className="auth-subtitle">Create your workspace and start building.</p>
                <form
                    className="auth-form"
                    onSubmit={handleSignup}
                >
                    <div className="auth-field">
                        <label>Email</label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="auth-field">
                        <label>Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    {
                        error &&
                        <p className="auth-error">
                            {error}
                        </p>
                    }
                    <Button
                        disabled={loading}
                        className="auth-submit"
                    >
                        {
                            loading
                                ? "Creating hive..."
                                : "Take me to the Hive"
                        }
                    </Button>
                </form>
                <AuthDivider />
                <GoogleButton />
                <p className="auth-help">By signing up you agree to our Terms and Privacy Policy.</p>
            </AuthModal>
        </AuthLayout>
    );
}


export default SignupPage;