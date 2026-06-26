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

export async function uploadAvatar(userId, file) {
    const ext = file.name.split(".").pop();
    const path = `${userId}.${ext}`;
    const { error } =
        await supabase.storage
            .from("avatars")
            .upload(path, file, {
                upsert: true,
            });
    if (error) {
        return {
            data: null,
            error,
        };
    }
    const {
        data: { publicUrl },
    } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

    return {
        data: publicUrl,
        error: null,
    };
}