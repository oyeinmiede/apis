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
import BoardsPage from "@/features/boards/pages/BoardsPage";
import SettingsPage from "@/features/settings/pages/SeettingsPage";
import TemplatePage from "@/features/templates/pages/TemplatePage";
import TeamsPage from "@/features/teams/pages/TeamsPage";
import LandingPage from "@/features/default/LandingPage";
import NotFoundPage from "@/features/default/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <LandingPage />
        ),
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
                <WorkspaceRequiredRoute>
                    <BoardPage />
                </WorkspaceRequiredRoute>
            </ProtectedRoute>
        ),
    },
    {
        path: "/templates",
        element: (
            <ProtectedRoute>
            <WorkspaceRequiredRoute>
                <TemplatePage />
            </WorkspaceRequiredRoute>
            </ProtectedRoute>
        ),
    },
    {
        path: "/teams",
        element: (
            <ProtectedRoute>
            <WorkspaceRequiredRoute>
                <TeamsPage />
            </WorkspaceRequiredRoute>
            </ProtectedRoute>
        ),
    },
    {
        path: "/settings",
        element: (
            <ProtectedRoute>
            <WorkspaceRequiredRoute>
                <SettingsPage />
            </WorkspaceRequiredRoute>
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
        path: "/boards",
        element: (
            <ProtectedRoute>
            <WorkspaceRequiredRoute>
                <BoardsPage />
            </WorkspaceRequiredRoute>
            </ProtectedRoute>
        ),
    },
    {
        path: "/auth/callback",
        element: <AuthCallback />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);


export default router;