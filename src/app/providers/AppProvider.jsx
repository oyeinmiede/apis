import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";
import AuthProvider from "./AuthProvider";
import WorkspaceProvider from "@/features/workspace/providers/WorkSpaceProvider";
import BoardProvider from "@/features/boards/providers/BoardProvider";


function AppProvider() {
    return (
        <AuthProvider>
            <WorkspaceProvider>
                <BoardProvider>
                    <RouterProvider router={router} />
                </BoardProvider>
            </WorkspaceProvider>
        </AuthProvider>
    );
}

export default AppProvider;