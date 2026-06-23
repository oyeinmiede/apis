import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";
import GoogleButton from "../components/GoogleButton";
import AuthDivider from "../components/AuthDivider";
import PasswordInput from "../components/PasswordInput";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import '../styles/login.css'

function LoginPage() {
    return (
        <AuthLayout mode="login">
            <AuthModal>
                <h1>Sign in to Apis</h1>
                <p>
                    Welcome back to your hive.
                </p>

                <form className="auth-form">
                    <GoogleButton />
                    <AuthDivider />

                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <PasswordInput
                            id="password"
                            placeholder="Enter your password"
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
                    <Button type="submit">
                        Sign in with email
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
