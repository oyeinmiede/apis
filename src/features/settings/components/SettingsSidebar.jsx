import {
    Palette,
    User,
    Shield,
    Building2,
    Info,
} from "lucide-react";

import "./../styles/settings-sidebar.css";

const items = [
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
    },
    {
        id: "profile",
        label: "Profile",
        icon: User,
    },
    {
        id: "account",
        label: "Account",
        icon: Shield,
    },
    {
        id: "workspace",
        label: "Workspace",
        icon: Building2,
    },
    {
        id: "about",
        label: "About",
        icon: Info,
    },
];

function SettingsSidebar({
    active,
    onChange,
}) {
    return (
        <aside className="settings-sidebar">

            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        className={`settings-nav-item ${
                            active === item.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onChange(item.id)
                        }
                    >
                        <Icon size={18} />

                        <span>
                            {item.label}
                        </span>
                    </button>
                );
            })}

        </aside>
    );
}

export default SettingsSidebar;