import { supabase } from "@/services/supabase/client";

export async function getBoards(workspaceId) {
    return await supabase
        .from("boards")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("updated_at", {
            ascending: false,
        });
}

export async function createBoard({
    workspaceId,
    userId,
    title,
}) {
    return await supabase
        .from("boards")
        .insert({
            workspace_id: workspaceId,
            created_by: userId,
            title,
        })
        .select()
        .single();
}