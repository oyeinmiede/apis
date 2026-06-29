import{useEffect,useState}from"react";

import{Sparkles}from"lucide-react";

import { getWorkspaceActivity } from "./services/activity";

import ActivityItem from"./ActivityItem";
import "../styles/hive-activity.css";

function ActivityFeed({workspaceId}){

    const[activities,setActivities]=useState([]);

    useEffect(()=>{

        if(workspaceId){
            load();
        }

    },[workspaceId]);

    async function load(){

        const{data,error}=await getWorkspaceActivity(workspaceId);

        if(!error){
            setActivities(data||[]);
        }

    }

    return(

        <aside className="hive-activity">

            <div className="hive-activity-header">

                <Sparkles size={18}/>

                <h2>
                    Hive Activity
                </h2>

            </div>

            <div className="activity-list">

                {activities.length===0?(
                    <p className="activity-empty">
                        No activity yet.
                    </p>
                ):(
                    activities.slice(0,4).map(activity=>(

                        <ActivityItem
                            key={activity.id}
                            activity={activity}
                        />

                    ))
                )}

            </div>

        </aside>

    );

}

export default ActivityFeed;