import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";
import AuthProvider from "./AuthProvider";


function AppProvider() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default AppProvider;