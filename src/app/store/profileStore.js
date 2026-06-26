import { create } from "zustand";

const useProfileStore = create((set) => ({
    profile: null,
    loading: true,

    setProfile: (profile) =>
        set({
            profile,
            loading: false,
        }),

    setLoading: (loading) =>
        set({ loading }),
}));

export default useProfileStore;