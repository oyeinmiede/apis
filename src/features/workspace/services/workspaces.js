import { supabase } from "@/services/supabase/client";

/*
|--------------------------------------------------------------------------
| Get all workspaces for a user
|--------------------------------------------------------------------------
*/

export async function getUserWorkspaces(userId){
    const result=await supabase
        .from("workspace_members")
        .select(`
            role,
            workspaces(
                id,
                name,
                emoji,
                cover_color,
                owner_id,
                created_at
            )
        `)
        .eq("user_id",userId);

    return result;
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

export async function addWorkspaceMember(
    workspaceId,
    email,
    role,
    invitedBy
) {

    const { data: userId } =
        await supabase.rpc(
            "get_user_by_email",
            {
                user_email: email,
            }
        );

    if (!userId) {
        return {
            error: {
                message:
                    "User not found.",
            },
        };
    }

    return await supabase
        .from(
            "workspace_members"
        )
        .insert({
            workspace_id:
                workspaceId,
            user_id:
                userId,
            role,
            invited_by:
                invitedBy,
        });
}

export async function getWorkspaceMembers(workspaceId) {

    const { data: members, error } = await supabase
        .from("workspace_members")
        .select("id,user_id,role,joined_at")
        .eq("workspace_id", workspaceId);

    if (error) {
        return { data: null, error };
    }

    const ids = members.map(m => m.user_id);

    const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*");

    if (profileError) {
        return { data: null, error: profileError };
    }

    const profileMap = new Map(
        profiles.map(p => [p.id, p])
    );

    return {
        error: null,
        data: members.map(member => ({
            ...member,
            profiles: profileMap.get(member.user_id)
        }))
    };
}

export async function updateMemberRole(
    workspaceId,
    userId,
    role
) {
    return await supabase
        .from("workspace_members")
        .update({
            role,
        })
        .eq(
            "workspace_id",
            workspaceId
        )
        .eq(
            "user_id",
            userId
        );
}

export async function removeMember(
    workspaceId,
    userId
) {
    return await supabase
        .from("workspace_members")
        .delete()
        .eq(
            "workspace_id",
            workspaceId
        )
        .eq(
            "user_id",
            userId
        );
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