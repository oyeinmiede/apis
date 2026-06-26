import { create } from "zustand";

const useWorkspaceStore = create((set) => ({
    workspaces: [],
    currentWorkspace: null,
    loading: true,

    setLoading: (loading) =>
        set({ loading }),

    setWorkspaces: (workspaces) =>
        set({ workspaces }),

    setCurrentWorkspace: (workspace) => {
        localStorage.setItem(
            "current-workspace",
            workspace.id
        );

        set({
            currentWorkspace: workspace,
        });
    },

    addWorkspace: (workspace) =>
        set((state) => ({
            workspaces: [
                ...state.workspaces,
                workspace,
            ],
            currentWorkspace: workspace,
        })),
}));

export default useWorkspaceStore;