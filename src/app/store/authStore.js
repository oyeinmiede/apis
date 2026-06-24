import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    session: null,
    loading: true,  
    setLoading: (loading) => set({ loading }),
    setSession: (session) => {
        set({
            session,
            user: session?.user ?? null
        })
    }
}));

export default useAuthStore;