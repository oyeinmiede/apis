import {createActivity} from "./activity";
import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

export async function logActivity({
    action,
    entity,
    entityName,
    workspaceId,
    userId
}){

    const authUser=useAuthStore.getState().user;
    const currentWorkspace=useWorkspaceStore.getState().currentWorkspace;

    return createActivity({
        workspaceId:workspaceId??currentWorkspace?.id,
        userId:userId??authUser?.id,
        action,
        entity,
        entityName
    });

}