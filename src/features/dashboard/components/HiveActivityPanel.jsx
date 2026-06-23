import { Sparkles } from "lucide-react";
import { activities } from "../data/activity";
import "../styles/hive-activity.css";


function HiveActivityPanel() {
    return (
        <aside className="hive-activity">
            <div className="hive-activity-header">
                <Sparkles size={18} />
                <h2>Hive Activity</h2>
            </div>
            <div className="activity-list">
                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="activity-item"
                    >
                        <div className="activity-avatar">
                            {item.user.charAt(0)}
                        </div>
                        <div>
                            <p>
                                <strong>
                                    {item.user}
                                </strong>{" "}
                                {item.action}{" "}
                                <strong>
                                    {item.target}
                                </strong>
                            </p>
                            <span>
                                {item.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}


export default HiveActivityPanel;