import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";
import GoogleButton from "../components/GoogleButton";
import AuthDivider from "../components/AuthDivider";
import PasswordInput from "../components/PasswordInput";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/services/supabase/auth";

import '../styles/login.css'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { error } = await signIn({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        navigate("/dashboard");
    }

    return (
        <AuthLayout mode="login">
            <AuthModal>
                <h1>Sign in to Apis</h1>
                <p>
                    Welcome back to your hive.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <GoogleButton />
                    <AuthDivider />

                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <PasswordInput
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-options">
                        <div>
                            <Checkbox id="remember" />
                            <label htmlFor="remember">
                                Remember me
                            </label>
                        </div>
                        <a href="/forgot-password">
                            Forgot password?
                        </a>
                    </div>
                    {
                        error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )
                    }
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? "Signing in..."
                            : "Sign in with email"}
                    </Button>
                    <p className="auth-help">
                        Having trouble signing in?{" "}
                        <a href="/forgot-password">
                            Reset link here
                        </a>
                    </p>
                </form>
            </AuthModal>
        </AuthLayout>
    );
}

export default LoginPage;
