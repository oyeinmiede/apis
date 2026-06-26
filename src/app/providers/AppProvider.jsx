import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";

import AppInitializer from "./AppInitializer";

import ProfileProvider from "@/features/settings/providers/ProfileProviders";
import BoardProvider from "@/features/boards/providers/BoardProvider";
import ThemeProvider from "./ThemeProvider";

function AppProvider() {
    return (
        <ThemeProvider>
            <AppInitializer>
                <ProfileProvider>
                    <BoardProvider>
                        <RouterProvider router={router} />
                    </BoardProvider>
                </ProfileProvider>
            </AppInitializer>
        </ThemeProvider>
    );
}

export default AppProvider;