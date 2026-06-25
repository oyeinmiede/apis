import { useEffect } from "react";
import { supabase } from "@/services/supabase/client";
import useAuthStore from "@/app/store/authStore";

function AuthProvider({
    children,
}) {
    const setSession =
        useAuthStore(
            (state) => state.setSession
        );

    const setLoading =
        useAuthStore(
            (state) =>
                state.setLoading
        );

    useEffect(() => {
        async function initialize() {
            const { data } =
                await supabase.auth.getSession();

            setSession(data.session);
            setLoading(false);
        }

        initialize();

        const {
            data: listener,
        } =
            supabase.auth.onAuthStateChange(
                (_, session) => {
                    setSession(session);
                    setLoading(false);
                }
            );

        return () =>
            listener.subscription.unsubscribe();
    }, []);

    return children;
}

export default AuthProvider;