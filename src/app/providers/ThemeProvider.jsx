import { useEffect } from "react";

import useThemeStore from "@/app/store/themeStore";

function ThemeProvider({ children }) {
    const theme = useThemeStore(
        (state) => state.theme
    );

    const setTheme = useThemeStore(
        (state) => state.setTheme
    );

    useEffect(() => {
        const saved =
            localStorage.getItem("apis-theme");

        if (saved) {
            setTheme(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme =
            theme.mode;

        document.documentElement.dataset.accent =
            theme.accent;

        localStorage.setItem(
            "apis-theme",
            JSON.stringify(theme)
        );
    }, [theme]);

    return children;
}

export default ThemeProvider;