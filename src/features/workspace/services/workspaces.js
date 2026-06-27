import { supabase } from "@/services/supabase/client";
import { logActivity } from "@/features/dashboard/components/services/logActivity";
import { createNotification } from "@/components/layout/services/notifications";
import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

/*
|--------------------------------------------------------------------------
| Get all workspaces for a user
|--------------------------------------------------------------------------
*/

export async function getUserWorkspaces(userId) {
    const result = await supabase
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
        .eq("user_id", userId);

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
        return { data: null, error };
    }

    await logActivity({
        action: "created workspace",
        entity: "workspace",
        entityName: name,
    });

    const { error: memberError } = await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspace.id,
            user_id: ownerId,
            role: "owner",
        });

    if (memberError) {
        return { data: null, error: memberError };
    }

    return { data: workspace, error: null };
}

/*
|--------------------------------------------------------------------------
| Add member to workspace
|--------------------------------------------------------------------------
*/

export async function addWorkspaceMember(workspaceId, email, role, invitedBy) {
    const currentUser = useAuthStore.getState().user;
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    const { data: userId } = await supabase.rpc("get_user_by_email", {
        user_email: email,
    });

    if (!userId) {
        return { error: { message: "User not found." } };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", userId)
        .single();

    const { error } = await supabase
        .from("workspace_members")
        .insert({
            workspace_id: workspaceId,
            user_id: userId,
            role,
            invited_by: invitedBy,
        });

    if (!error) {
        await logActivity({
            action: "added member",
            entity: "member",
            entityName: profile?.full_name || profile?.username || "Unknown User",
        });

        await createNotification({
            user_id: userId,
            actor_id: currentUser.id,
            title: "Workspace invitation",
            body: `${currentWorkspace?.name} invited you.`,
        });
    }

    return { error };
}

/*
|--------------------------------------------------------------------------
| Get workspace members
|--------------------------------------------------------------------------
*/

export async function getWorkspaceMembers(workspaceId) {
    const { data: members, error } = await supabase
        .from("workspace_members")
        .select("id, user_id, role, joined_at")
        .eq("workspace_id", workspaceId);

    if (error) {
        return { data: null, error };
    }

    const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*");

    if (profileError) {
        return { data: null, error: profileError };
    }

    const profileMap = new Map(profiles.map(p => [p.id, p]));

    return {
        error: null,
        data: members.map(member => ({
            ...member,
            profiles: profileMap.get(member.user_id),
        })),
    };
}

/*
|--------------------------------------------------------------------------
| Update member role
|--------------------------------------------------------------------------
*/

export async function updateMemberRole(workspaceId, userId, role) {
    const currentUser = useAuthStore.getState().user;
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    const result = await supabase
        .from("workspace_members")
        .update({ role })
        .eq("workspace_id", workspaceId)
        .eq("user_id", userId);

    if (!result.error) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, username")
            .eq("id", userId)
            .single();

        await logActivity({
            action: "updated member role",
            entity: "member",
            entityName: profile?.full_name || profile?.username || "Unknown User",
        });

        await createNotification({
            user_id: userId,
            actor_id: currentUser.id,
            title: "Role updated",
            body: `Your role was changed to ${role} in ${currentWorkspace.name}.`,
        });
    }

    return result;
}

/*
|--------------------------------------------------------------------------
| Remove member
|--------------------------------------------------------------------------
*/

export async function removeMember(workspaceId, userId) {
    const currentUser = useAuthStore.getState().user;
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", userId)
        .single();

    const result = await supabase
        .from("workspace_members")
        .delete()
        .eq("workspace_id", workspaceId)
        .eq("user_id", userId);

    if (!result.error) {
        await logActivity({
            action: "removed member",
            entity: "member",
            entityName: profile?.full_name || profile?.username || "Unknown User",
        });

        await createNotification({
            user_id: userId,
            actor_id: currentUser.id,
            title: "Removed",
            body: `You were removed from ${currentWorkspace?.name}.`,
        });
    }

    return result;
}

/*
|--------------------------------------------------------------------------
| Update workspace
|--------------------------------------------------------------------------
*/

export async function updateWorkspace(workspaceId, updates) {
    const result = await supabase
        .from("workspaces")
        .update(updates)
        .eq("id", workspaceId)
        .select()
        .single();

    if (!result.error) {
        await logActivity({
            action: "updated workspace",
            entity: "workspace",
            entityName: result.data.name,
        });
    }

    return result;
}

/*
|--------------------------------------------------------------------------
| Delete workspace
|--------------------------------------------------------------------------
*/

export async function deleteWorkspace(workspaceId) {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    const result = await supabase
        .from("workspaces")
        .delete()
        .eq("id", workspaceId);

    if (!result.error) {
        await logActivity({
            action: "deleted workspace",
            entity: "workspace",
            entityName: currentWorkspace?.name,
        });
    }

    return result;
}