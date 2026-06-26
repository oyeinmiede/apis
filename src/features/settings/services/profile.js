import { supabase } from "@/services/supabase/client";

export async function getProfile(userId) {
    return await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
}

export async function updateProfile(userId, values) {
    return await supabase
        .from("profiles")
        .update(values)
        .eq("id", userId)
        .select()
        .single();
}