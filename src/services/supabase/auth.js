import { supabase } from "./client";

export async function signUp({
    email,
    password,
}) {
    return await supabase.auth.signUp({
        email,
        password,
    });
}

export async function verifyEmail({
    email,
    token,
}) {
    return await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
    });
}


export async function resendEmailOtp(email){
    return await supabase.auth.resend({
        email,
        type: "signup",
    });
}

export async function signIn({
    email,
    password,
}) {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}

export async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo:
                `${window.location.origin}/auth/callback`,
        },
    });
}

export async function signOut() {
    return await supabase.auth.signOut();
}