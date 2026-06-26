import {createClient} from "npm:@supabase/supabase-js@2";

Deno.serve(async(req)=>{

    const auth=req.headers.get("Authorization");

    if(!auth){
        return new Response("Unauthorized",{status:401});
    }

    const client=createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        {
            global:{
                headers:{
                    Authorization:auth,
                },
            },
        }
    );

    const{
        data:{user},
    }=await client.auth.getUser();

    if(!user){
        return new Response("Unauthorized",{status:401});
    }

    const admin=createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await admin
        .from("workspace_members")
        .delete()
        .eq("user_id",user.id);

    await admin
        .from("profiles")
        .delete()
        .eq("id",user.id);

    await admin.auth.admin.deleteUser(user.id);

    return Response.json({
        success:true,
    });

});