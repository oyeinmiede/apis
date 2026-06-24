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
    return await supabase.auth.signInWithOAuth({
        provider: "google",
    });
}

export async function signOut() {
    return await supabase.auth.signOut();
}