import {supabase} from "@/services/supabase/client";

export async function getConnections(userId){

    const {data:myMemberships,error}=await supabase
        .from("workspace_members")
        .select(`
            workspace_id,
            workspaces(
                id,
                name,
                emoji,
                owner_id
            )
        `)
        .eq("user_id",userId);

    if(error){
        return{data:null,error};
    }

    const workspaceIds=myMemberships.map(
        m=>m.workspace_id
    );

    if(!workspaceIds.length){
        return{data:[],error:null};
    }

    const {data:members,error:memberError}=await supabase
        .from("workspace_members")
        .select(`
            user_id,
            role,
            workspace_id
        `)
        .in(
            "workspace_id",
            workspaceIds
        );

    if(memberError){
        return{
            data:null,
            error:memberError,
        };
    }

    const ids=[
        ...new Set(
            members.map(
                m=>m.user_id
            )
        )
    ];

    const {data:profiles,error:profileError}=await supabase
        .from("profiles")
        .select(`
            id,
            full_name,
            username,
            avatar_url
        `)
        .in("id",ids);

    if(profileError){
        return{
            data:null,
            error:profileError,
        };
    }

    const connections=profiles
        .filter(
            p=>p.id!==userId
        )
        .map(profile=>{

            const sharedMembers=
                members.filter(
                    m=>m.user_id===profile.id
                );

            const sharedWorkspaces=
                sharedMembers.map(member=>{

                    const workspace=
                        myMemberships.find(
                            w=>w.workspace_id===member.workspace_id
                        );

                    return{
                        ...workspace.workspaces,
                        role:member.role,
                    };

                });

            return{
                ...profile,
                sharedWorkspaces,
                sharedCount:sharedWorkspaces.length,
            };

        });

    return{
        data:connections,
        error:null,
    };

}