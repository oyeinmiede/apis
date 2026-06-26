import {
    RouterProvider,
} from "react-router-dom";

import router from "../router/router";
import AppInitializer from "./AppInitializer";

function AppProvider() {
    return (
        <AppInitializer>
            <RouterProvider router={router} />
        </AppInitializer>
    );
}

export default AppProvider;