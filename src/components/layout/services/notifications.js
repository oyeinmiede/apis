import {supabase} from "@/services/supabase/client";

export async function getNotifications(userId){

    return await supabase
        .from("notifications")
        .select(`
            *,
            profiles!notifications_actor_id_fkey(
                full_name,
                username,
                avatar_url
            )
        `)
        .eq("user_id",userId)
        .order("created_at",{ascending:false});

}

export async function markNotificationRead(id){

    return await supabase
        .from("notifications")
        .update({
            read:true
        })
        .eq("id",id);

}

export async function createNotification(notification){

    return await supabase
        .from("notifications")
        .insert(notification);

}