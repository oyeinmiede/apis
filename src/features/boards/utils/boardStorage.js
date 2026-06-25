export async function loadBoardSnapshot(
    supabase,
    boardId
) {
    const {
        data,
        error
    } = await supabase
        .from("boards")
        .select("snapshot")
        .eq("id", boardId)
        .single();


    if (error) {
        console.error(
            "Load snapshot error:",
            error
        );
        return null;
    }


    return data?.snapshot || null;
}



export async function saveBoardSnapshot(
    supabase,
    boardId,
    snapshot
) {
    const {
        error
    } = await supabase
        .from("boards")
        .update({
            snapshot,
            updated_at: new Date()
        })
        .eq(
            "id",
            boardId
        );


    if (error) {
        console.error(
            "Save snapshot error:",
            error
        );
    }
}