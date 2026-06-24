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
        supabase.auth
            .getSession()
            .then(({ data }) => {
                setSession(
                    data.session
                );
                setLoading(false)
            });

        const {
            data: listener,
        } =
            supabase.auth.onAuthStateChange(
                (_, session) => {
                    setSession(
                        session
                    );
                }
            );

        return () =>
            listener.subscription.unsubscribe();
    }, []);

    return children;
}

export default AuthProvider;