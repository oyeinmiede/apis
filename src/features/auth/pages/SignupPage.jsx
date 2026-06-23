import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";

function SignupPage() {
    return (
        <AuthLayout>
            <AuthModal>
                <h1>Your hive is ready</h1>
                <p>Create your workspace and start building.</p>
            </AuthModal>
        </AuthLayout>
    )
}

export default SignupPage; 