import { supabase } from "@/services/supabase/client";
import { logActivity } from "@/features/dashboard/components/services/logActivity";

export async function getBoards(workspaceId) {
    return await supabase
        .from("boards")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("updated_at", {
            ascending: false,
        });
}

export async function getBoard(boardId) {
    return await supabase
        .from("boards")
        .select("*")
        .eq("id", boardId)
        .single();
}

export async function createBoard({ workspaceId, userId, title }) {
    const result = await supabase
        .from("boards")
        .insert({ workspace_id: workspaceId, created_by: userId, title })
        .select()
        .single();

    if (!result.error) {
        await logActivity({
            action: "created board",
            entity: "board",
            entityName: title,
        });
    }

    return result;
}

export async function updateBoard({ boardId, title }) {
    const result = await supabase
        .from("boards")
        .update({ title })
        .eq("id", boardId)
        .select()
        .single();

    if (!result.error) {
        await logActivity({
            action: "updated board",
            entity: "board",
            entityName: result.data.title,
        });
    }

    return result;
}

export async function deleteBoard({ boardId, title }) {
    const result = await supabase
        .from("boards")
        .delete()
        .eq("id", boardId);

    if (!result.error) {
        await logActivity({
            action: "deleted board",
            entity: "board",
            entityName: title,
        });
    }

    return result;
}

// ─── Members ──────────────────────────────────────────────



export async function updateMemberRole({ workspaceId, userId, role }) {
    const result = await supabase
        .from("workspace_members")
        .update({ role })
        .eq("workspace_id", workspaceId)
        .eq("user_id", userId)
        .select()
        .single();

    if (!result.error) {
        await logActivity({
            action: "updated member role",
            entity: "member",
            entityName: userId,
        });
    }

    return result;
}