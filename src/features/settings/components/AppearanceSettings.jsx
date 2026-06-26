import { Moon, Sun, Check } from "lucide-react";

import useThemeStore from "@/app/store/themeStore";

import "../styles/settings.css";

function AppearanceSettings() {
    const theme = useThemeStore(
        (state) => state.theme
    );

    const setMode = useThemeStore(
        (state) => state.setMode
    );

    const setAccent = useThemeStore(
        (state) => state.setAccent
    );

    const accents = [
        {
            id: "bronze",
            name: "Bronze",
            color: "#b87333",
        },
        {
            id: "blue",
            name: "Blue",
            color: "#3b82f6",
        },
        {
            id: "green",
            name: "Green",
            color: "#22c55e",
        },
        {
            id: "purple",
            name: "Purple",
            color: "#8b5cf6",
        },
    ];

    return (
        <section className="settings-section">
            <div className="settings-section-header">
                <h2>Appearance</h2>

                <p>
                    Customize how Apis looks.
                </p>
            </div>

            <div className="theme-grid">
                <button
                    className={`theme-card ${
                        theme.mode === "light"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        setMode("light")
                    }
                >
                    {theme.mode === "light" && (
                        <Check
                            size={18}
                            className="theme-check"
                        />
                    )}

                    <div className="theme-preview light-preview">
                        <div className="preview-sidebar" />
                        <div className="preview-content">
                            <div className="preview-line short" />
                            <div className="preview-line" />
                            <div className="preview-line" />
                        </div>
                    </div>

                    <div className="theme-info">
                        <Sun size={18} />

                        <div>
                            <h3>Light</h3>
                            <span>
                                Bright interface
                            </span>
                        </div>
                    </div>
                </button>

                <button
                    className={`theme-card ${
                        theme.mode === "dark"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        setMode("dark")
                    }
                >
                    {theme.mode === "dark" && (
                        <Check
                            size={18}
                            className="theme-check"
                        />
                    )}

                    <div className="theme-preview dark-preview">
                        <div className="preview-sidebar" />
                        <div className="preview-content">
                            <div className="preview-line short" />
                            <div className="preview-line" />
                            <div className="preview-line" />
                        </div>
                    </div>

                    <div className="theme-info">
                        <Moon size={18} />

                        <div>
                            <h3>Dark</h3>
                            <span>
                                Easier on the eyes
                            </span>
                        </div>
                    </div>
                </button>
            </div>

            <div className="accent-section">
                <h3>Accent</h3>

                <div className="accent-grid">
                    {accents.map((accent) => (
                        <button
                            key={accent.id}
                            className={`accent-card ${
                                theme.accent === accent.id
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setAccent(accent.id)
                            }
                        >
                            {theme.accent === accent.id && (
                                <Check
                                    size={16}
                                    className="theme-check"
                                />
                            )}

                            <div
                                className="accent-preview"
                                style={{
                                    background:
                                        accent.color,
                                }}
                            />

                            <span>
                                {accent.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AppearanceSettings;