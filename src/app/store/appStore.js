import { create } from "zustand";

const useAppStore = create((set) => ({
    initialized: false,
    setInitialized: (initialized) => set({ initialized }),
}));

export default useAppStore;