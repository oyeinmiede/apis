import { Search } from "lucide-react";
import './../styles/command-bar.css'

function CommandBar() {
    return (
        <div className="command-bar">
            <Search size={18} />

            <input
                placeholder="Search boards, templates, teams..."
            />
        </div>
    );
}

export default CommandBar;