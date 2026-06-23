import { signIn } from "@/services/supabase/auth";
import { signUp } from "@/services/supabase/auth";

export function useAuth() {
    async function login(
        email,
        password
    ) {
        return await signIn({
            email,
            password,
        });
    }

    async function register(
        email,
        password
    ) {
        return await signUp({
            email,
            password,
        });
    }

    return {
        login,
        register,
    };
}