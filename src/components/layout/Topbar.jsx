import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useProfileStore from "@/app/store/profileStore";
import { signOut } from "@/services/supabase/auth";
import "./styles/topbar.css";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./components/NotificationBell";
import SearchBar from "./components/Searchbar";

function Topbar() {
    const profile = useProfileStore(
        (state) => state.profile
    );
    const navigate = useNavigate()

    const displayName =
        profile?.full_name ||
        profile?.username ||
        profile?.email?.split("@")[0] ||
        "User";

    const initial = displayName.charAt(0).toUpperCase();

    return (
        <header className="topbar">
            <SearchBar />
            <div className="topbar-actions">
                <NotificationBell />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                            <span>{displayName}</span>
                            <ChevronDown size={16} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="profile-dropdown"
                        sideOffset={10}
                    >
                        <DropdownMenuLabel>
                            <div className="dropdown-user">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        className="dropdown-avatar"
                                    />
                                ) : (
                                    <div className="dropdown-avatar initials">
                                        {initial}
                                    </div>
                                )}
                                <div>
                                    <strong>{displayName}</strong>
                                    <span>{profile?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>My Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/settings")}>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>Notifications</DropdownMenuItem>
                        <DropdownMenuItem>Help & Feedback</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="logout-item"
                            onClick={signOut}
                        >
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default Topbar;