import { create } from "zustand";

const useWorkspaceStore = create((set) => ({
    currentWorkspace: null,
    setCurrentWorkspace: (workspace) =>
        set({ currentWorkspace: workspace }),
}));

export default useWorkspaceStore;
