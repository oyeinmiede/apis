import {Users} from "lucide-react";

import {Avatar,AvatarFallback,AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

import "../styles/teams.css";

function TeamCard({member,onView}){

    const initials=(member.full_name||member.username||"?")
        .split(" ")
        .map(n=>n[0])
        .join("")
        .slice(0,2)
        .toUpperCase();

    return(

        <article className="team-card">

            <div className="team-card-header">

                <Avatar className="team-avatar">

                    <AvatarImage
                        src={member.avatar_url}
                    />

                    <AvatarFallback>
                        {initials}
                    </AvatarFallback>

                </Avatar>

                <div className="team-meta">

                    <h3>
                        {member.full_name}
                    </h3>

                    <span>
                        @{member.username}
                    </span>

                </div>

            </div>

            <div className="team-stats">

                <Users size={16}/>

                <span>

                    {member.sharedCount}

                    {" "}

                    shared workspace{member.sharedCount!==1&&"s"}

                </span>

            </div>

            <div className="team-workspaces">

                {member.sharedWorkspaces.slice(0,4).map(workspace=>(

                    <div
                        key={workspace.id}
                        className="team-workspace-pill"
                    >

                        <span>
                            {workspace.emoji}
                        </span>

                        <span>
                            {workspace.name}
                        </span>

                    </div>

                ))}

                {member.sharedWorkspaces.length>4&&(

                    <div className="team-workspace-pill">

                        +{member.sharedWorkspaces.length-4}

                    </div>

                )}

            </div>

            <Button
                variant="outline"
                onClick={()=>onView(member)}
            >
                View Profile
            </Button>

        </article>

    );

}

export default TeamCard;