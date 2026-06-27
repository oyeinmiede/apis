import {supabase} from "@/services/supabase/client";

export async function searchApis(query){

    if(!query.trim()){
        return{
            boards:[],
            workspaces:[],
            profiles:[],
        };
    }

    const[
        boards,
        workspaces,
        profiles,
    ]=await Promise.all([

        supabase
            .from("boards")
            .select("id,title")
            .ilike("title",`%${query}%`)
            .limit(5),

        supabase
            .from("workspaces")
            .select("id,name,emoji")
            .ilike("name",`%${query}%`)
            .limit(5),

        supabase
            .from("profiles")
            .select("id,full_name,username,avatar_url")
            .or(
                `full_name.ilike.%${query}%,username.ilike.%${query}%`
            )
            .limit(5),

    ]);

    return{
        boards:boards.data??[],
        workspaces:workspaces.data??[],
        profiles:profiles.data??[],
    };

}