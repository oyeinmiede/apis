import { create } from "zustand";

const defaultTheme = {
    mode: "dark",
    accent: "bronze",
};

// Try to parse stored theme safely
let storedTheme = null;
try {
    const raw = localStorage.getItem("theme");
    if (raw) {
        storedTheme = JSON.parse(raw);
    }
} catch (e) {
    console.warn("Invalid theme in localStorage, falling back to default", e);
}

const initialTheme = storedTheme ?? defaultTheme;

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme.mode;
    document.documentElement.dataset.accent = theme.accent;

    localStorage.setItem("theme", JSON.stringify(theme));
}

applyTheme(initialTheme);

const useThemeStore = create((set, get) => ({
    theme: initialTheme,

    setTheme(theme) {
        applyTheme(theme);
        set({ theme });
    },

    setMode(mode) {
        const theme = { ...get().theme, mode };
        applyTheme(theme);
        set({ theme });
    },

    setAccent(accent) {
        const theme = { ...get().theme, accent };
        applyTheme(theme);
        set({ theme });
    },
}));


export default useThemeStore;
