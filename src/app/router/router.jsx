import {
    createBrowserRouter,
} from "react-router-dom";

import DashboardPage from '../../features/dashboard/pages/DashboardPage'


const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Landing</div>,
    },

    {
        path: "/login",
        element: <div>Login</div>,
    },

    {
        path: "/signup",
        element: <div>Signup</div>,
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