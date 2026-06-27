import {supabase} from "@/services/supabase/client";

export async function getWorkspaceActivity(workspaceId){

    return await supabase
        .from("activity_logs")
        .select(`
            id,
            action,
            entity,
            entity_name,
            created_at,
            profiles!activity_logs_user_id_fkey(
                full_name,
                username,
                avatar_url
            )
        `)
        .eq("workspace_id",workspaceId)
        .order("created_at",{ascending:false})
        .limit(30);

}

export async function createActivity({
    workspaceId,
    userId,
    action,
    entity,
    entityName,
    metadata={}
}){

    return await supabase
        .from("activity_logs")
        .insert({
            workspace_id:workspaceId,
            user_id:userId,
            action,
            entity,
            entity_name:entityName,
            metadata
        });

}