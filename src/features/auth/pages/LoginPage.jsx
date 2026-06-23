import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";

function LoginPage() {
    return (
        <AuthLayout>
            <AuthModal>
                <h1>Sign in to Apis</h1>
                <p>Welcome back to your hive.</p>
            </AuthModal>
        </AuthLayout>
    )
}

export default LoginPage;