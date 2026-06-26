import {
    Bell,
    ChevronDown,
    Search,
} from "lucide-react";

import useProfileStore from "@/app/store/profileStore";

import "./styles/topbar.css";

function Topbar() {
    const profile = useProfileStore(
        (state) => state.profile
    );

    const displayName =
        profile?.full_name ||
        profile?.username ||
        profile?.email?.split("@")[0] ||
        "User";

    const initial = displayName.charAt(0).toUpperCase();

    return (
        <header className="topbar">
            <div className="topbar-search">
                <Search size={16} />

                <input
                    type="text"
                    placeholder="Search Apis..."
                />
            </div>

            <div className="topbar-actions">
                <button className="topbar-icon">
                    <Bell size={18} />
                </button>

                <button className="topbar-profile">
                    {profile?.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            className="profile-avatar-image"
                            alt={displayName}
                        />
                    ) : (
                        <div className="profile-avatar">
                            {initial}
                        </div>
                    )}

                    <span>
                        {displayName}
                    </span>

                    <ChevronDown size={16} />
                </button>
            </div>
        </header>
    );
}

export default Topbar;