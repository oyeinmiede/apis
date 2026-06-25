import { create } from "zustand";

const useWorkspaceStore = create((set) => ({
    currentWorkspace: null,
    loading: true,

    setCurrentWorkspace: (workspace) =>
        set({
            currentWorkspace: workspace,
            loading: false,
        }),

    setLoading: (loading) =>
        set({ loading }),
}));

export default useWorkspaceStore;