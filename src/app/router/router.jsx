import {
    createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import DashboardPage from '../../features/dashboard/pages/DashboardPage'
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";
import OnboardingPage from "../../features/workspace/pages/OnboardingPage";
import OnboardingGuard from "@/routes/OnboardingGuard";
import WorkspaceRequiredRoute from "@/routes/WorkspaceRequiredRoute";
import BoardPage from "@/features/boards/pages/BoardPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmail";
import AuthCallback from "@/features/auth/callback/AuthCallback";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Landing</div>,
    },

    {
        path: "/login",
        element: (
            <PublicOnlyRoute>
                <LoginPage />
            </PublicOnlyRoute>
        ),
    },

    {
        path: "/signup",
        element: (
            <PublicOnlyRoute>
                <SignupPage />
            </PublicOnlyRoute>
        ),
    },

    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <WorkspaceRequiredRoute>
                    <DashboardPage />
                </WorkspaceRequiredRoute>
            </ProtectedRoute>
        ),
    },

    {
        path: "/board/:id",
        element: (
            <ProtectedRoute>
                <BoardPage />
            </ProtectedRoute>
        ),
    },

    {
        path: "/settings",
        element: (
            <ProtectedRoute>
                <div>Settings</div>
            </ProtectedRoute>
        ),
    },
    {
        path: "/onboarding",
        element: (
            <ProtectedRoute>
                <OnboardingGuard>
                    <OnboardingPage />
                </OnboardingGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: "/verify-email",
        element: (
            <PublicOnlyRoute>
                <VerifyEmailPage />
            </PublicOnlyRoute>
        )
    },
    {
        path: "/auth/callback",
        element: <AuthCallback />,
    },
]);


export default router;