import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    session: null,
    setSession: (session) => {
        set({
            session,
            user: session?.user ?? null
        })
    }
}));

export default useAuthStore;