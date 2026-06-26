import { supabase } from "@/services/supabase/client";

/*
|--------------------------------------------------------------------------
| Get all workspaces for a user
|--------------------------------------------------------------------------
*/

export async function getUserWorkspaces(userId) {
    return await supabase
        .from("workspace_members")
        .select(`
            role,
            workspaces (
                id,
                name,
                emoji,
                cover_color,
                owner_id,
                created_at
            )
        `)
        .eq("user_id", userId);
}

/*
|--------------------------------------------------------------------------
| Create workspace
|--------------------------------------------------------------------------
*/

export async function createWorkspace({
    name,
    emoji = "🐝",
    coverColor = "#F9A825",
    ownerId,
}) {
    const { data: workspace, error } = await supabase
        .from("workspaces")
        .insert({
            name,
            emoji,
            cover_color: coverColor,
            owner_id: ownerId,
        })
        .select()
        .single();

    if (error) {
        return {
            data: null,
            error,
        };
    }

    const { error: memberError } = await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspace.id,
            user_id: ownerId,
            role: "owner",
        });

    if (memberError) {
        return {
            data: null,
            error: memberError,
        };
    }

    return {
        data: workspace,
        error: null,
    };
}

/*
|--------------------------------------------------------------------------
| Add member to workspace
|--------------------------------------------------------------------------
*/

export async function addWorkspaceMember({
    workspaceId,
    userId,
    role = "member",
}) {
    return await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspaceId,
            user_id: userId,
            role,
        });
}

/*
|--------------------------------------------------------------------------
| Update workspace
|--------------------------------------------------------------------------
*/

export async function updateWorkspace(workspaceId, updates) {
    return await supabase
        .from("workspaces")
        .update(updates)
        .eq("id", workspaceId)
        .select()
        .single();
}

/*
|--------------------------------------------------------------------------
| Delete workspace
|--------------------------------------------------------------------------
*/

export async function deleteWorkspace(workspaceId) {
    return await supabase
        .from("workspaces")
        .delete()
        .eq("id", workspaceId);
}