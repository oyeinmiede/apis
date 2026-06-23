import { create } from "zustand"

const useUiStore = create((set) => ({
    sidebarCollapsed: false,
    toggleSidebar: () =>
        set((state) => ({
            sidebarCollapsed:
                !state.sidebarCollapsed
        }))
}))