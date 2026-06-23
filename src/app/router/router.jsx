import {
    createBrowserRouter,
} from "react-router-dom";

import DashboardPage from '../../features/dashboard/pages/DashboardPage'
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Landing</div>,
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/signup",
        element: <SignupPage />,
    },

    {
        path: "/dashboard",
        element: <DashboardPage />,
    },

    {
        path: "/board/:id",
        element: <div>Board</div>,
    },

    {
        path: "/settings",
        element: <div>Settings</div>,
    },
]);


export default router;