import {formatDistanceToNow} from "date-fns";
import{ Avatar, AvatarImage, AvatarFallback }from "@/components/ui/avatar";

function ActivityItem({activity}){
    const profile=activity.profiles;
    const name=profile?.full_name||profile?.username||"Unknown";
    const initials=name
        .split(" ")
        .map(n=>n[0])
        .join("")
        .slice(0,2)
        .toUpperCase();

    return(
        <div className="activity-item">
            <Avatar className="activity-avatar">
                <AvatarImage
                    src={profile?.avatar_url}
                />
                <AvatarFallback>
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="activity-content">
                <p>
                    <strong>{name}</strong>
                    {" "}
                    {activity.action}
                    {" "}
                    <strong>{activity.entity_name}</strong>
                </p>
                <span>
                    {formatDistanceToNow(
                        new Date(activity.created_at),
                        {addSuffix:true}
                    )}
                </span>
            </div>
        </div>
    );
}

export default ActivityItem;