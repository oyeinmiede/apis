import{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
}from "@/components/ui/dialog";

import{
    Avatar,
    AvatarImage,
    AvatarFallback,
}from "@/components/ui/avatar";

import{Badge}from "@/components/ui/badge";

import{
    Crown,
    Users,
}from "lucide-react";

import "../styles/teams.css";

function TeamProfileDialog({
    member,
    open,
    onOpenChange,
}){

    if(!member)return null;

    const initials=(member.full_name||member.username||"?")
        .split(" ")
        .map(n=>n[0])
        .join("")
        .slice(0,2)
        .toUpperCase();

    return(

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="team-profile-dialog">

                <DialogHeader>

                    <DialogTitle>
                        Team Member
                    </DialogTitle>

                    <DialogDescription>
                        Shared workspaces and profile information.
                    </DialogDescription>

                </DialogHeader>

                <div className="team-profile">

                    <Avatar className="team-profile-avatar">

                        <AvatarImage
                            src={member.avatar_url}
                        />

                        <AvatarFallback>
                            {initials}
                        </AvatarFallback>

                    </Avatar>

                    <h2>
                        {member.full_name}
                    </h2>

                    <span>
                        @{member.username}
                    </span>

                    <Badge className="team-count-badge">

                        <Users size={14}/>

                        {member.sharedCount}

                        {" "}

                        Shared Workspace{member.sharedCount!==1&&"s"}

                    </Badge>

                </div>

                <div className="team-profile-section">

                    <h3>
                        Shared Workspaces
                    </h3>

                    <div className="team-workspace-list">

                        {member.sharedWorkspaces.map(workspace=>(

                            <div
                                key={workspace.id}
                                className="team-workspace-row"
                            >

                                <div className="team-workspace-left">

                                    <span className="team-workspace-emoji">
                                        {workspace.emoji}
                                    </span>

                                    <span>
                                        {workspace.name}
                                    </span>

                                </div>

                                <Badge
                                    variant="secondary"
                                >

                                    {workspace.role==="owner"&&(
                                        <Crown size={13}/>
                                    )}

                                    {workspace.role}

                                </Badge>

                            </div>

                        ))}

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default TeamProfileDialog;