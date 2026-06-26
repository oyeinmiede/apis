import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";
import AppInitializer from "./AppInitializer";
import ProfileProvider from "@/features/settings/providers/ProfileProviders";

function AppProvider() {
    return (
        <AppInitializer>
            <ProfileProvider>
                <RouterProvider router={router} />
            </ProfileProvider>
        </AppInitializer>
    );
}

export default AppProvider;