import { supabase } from "@/services/supabase/client";

export async function createWorkspace({
    name,
    ownerId,
}) {
    return await supabase
        .from("workspaces")
        .insert({
            name,
            owner_id: ownerId,
        })
        .select()
        .single();
}

export async function addWorkspaceMember({
    workspaceId,
    userId,
    role = "owner",
}) {
    return await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspaceId,
            user_id: userId,
            role,
        });
}

export async function getUserWorkspaces(
    userId
) {
    return await supabase
        .from("workspace_members")
        .select(`
            role,
            workspaces (
                id,
                name,
                owner_id,
                created_at
            )
        `)
        .eq("user_id", userId);
}