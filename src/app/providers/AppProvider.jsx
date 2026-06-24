import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";
import AuthProvider from "./AuthProvider";
import WorkspaceProvider from "@/features/workspace/providers/WorkSpaceProvider";


function AppProvider() {
    return (
        <AuthProvider>
            <WorkspaceProvider>
                <RouterProvider router={router} />
            </WorkspaceProvider>
        </AuthProvider>
    );
}

export default AppProvider;