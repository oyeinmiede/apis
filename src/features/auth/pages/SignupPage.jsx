import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";
import GoogleButton from "../components/GoogleButton";
import AuthDivider from "../components/AuthDivider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SignupPage() {
    return (
        <AuthLayout mode="signup">
            <AuthModal>
                <h1>Your hive is ready</h1>
                <p className="auth-subtitle">Create your workspace and start building.</p>
                <form className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>
                    <Button
                        className="auth-submit"
                    >
                        Take me to the Hive
                    </Button>
                </form>
                <AuthDivider />
                <GoogleButton />
                <p className="auth-help">
                    By signing up you agree to our Terms and Privacy Policy.
                </p>
            </AuthModal>
        </AuthLayout>
    );
}

export default SignupPage;