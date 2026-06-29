import {useEffect,useState} from "react";

import useAuthStore from "@/app/store/authStore";
import useWorkspaceStore from "@/app/store/workspaceStore";

import { getWorkspaceMembers } from "@/features/workspace/services/workspaces";

import WorkspaceList from "./WorkSpaceList";
import WorkspaceDetails from "./WorkspaceDetails";
import MemberList from "./MemberList";
import InviteMemberForm from "./InviteMemberForm";
import DeleteWorkspaceCard from "./DeleteWorkspaceCard";

import "./styles/workspace-settings.css";

function WorkspaceSettings(){

    const user=useAuthStore(s=>s.user);

    const{
        workspaces,
        setWorkspaces,
    }=useWorkspaceStore();

    const[selectedWorkspace,setSelectedWorkspace]=useState(null);
    const[members,setMembers]=useState([]);

    useEffect(()=>{
        if(!selectedWorkspace&&workspaces.length){
            setSelectedWorkspace(workspaces[0]);
        }
    },[workspaces]);

    useEffect(()=>{
        if(selectedWorkspace){
            loadMembers();
        }
    },[selectedWorkspace]);

    async function loadMembers(){
        if(!selectedWorkspace)return;
    
        const {data,error}=await getWorkspaceMembers(selectedWorkspace.id);
    
        if(!error){
            setMembers(data??[]);
        }
    }

    function updateWorkspace(updated){

        const next=workspaces.map(w=>
            w.id===updated.id
                ?updated
                :w
        );

        setWorkspaces(next);

        setSelectedWorkspace(updated);

    }

    return(
        <div className="workspace-settings-page">

            <WorkspaceList
                workspaces={workspaces}
                selected={selectedWorkspace}
                onSelect={setSelectedWorkspace}
            />

            <div className="workspace-settings-page-content">

                <WorkspaceDetails
                    workspace={selectedWorkspace}
                    editable={
                        selectedWorkspace?.owner_id===user.id
                    }
                    onUpdated={updateWorkspace}
                />

                <MemberList
                    workspace={selectedWorkspace}
                    members={members}
                    currentUser={user}
                    onRefresh={loadMembers}
                />

                <InviteMemberForm
                    workspace={selectedWorkspace}
                    currentUser={user}
                    editable={
                        selectedWorkspace?.owner_id===user.id
                    }
                    onInvite={loadMembers}
                />

                <DeleteWorkspaceCard
                    workspace={selectedWorkspace}
                    currentUser={user}
                />

            </div>

        </div>
    );
}

export default WorkspaceSettings;