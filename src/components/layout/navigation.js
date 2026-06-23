import {
    Home,
    LayoutGrid,
    FolderKanban,
    Users,
    Settings,
} from "lucide-react";

export const navigationItems = [
    {
        label: "Home",
        path: "/dashboard",
        icon: Home,
    },
    {
        label: "Boards",
        path: "/boards",
        icon: LayoutGrid,
    },
    {
        label: "Templates",
        path: "/templates",
        icon: FolderKanban,
    },
    {
        label: "Teams",
        path: "/teams",
        icon: Users,
    },
];

export const settingsItem = {
    label: "Settings",
    path: "/settings",
    icon: Settings,
};