import { useEffect, useState, useRef } from "react";
import { Camera } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useProfileStore from "@/app/store/profileStore";
import { updateProfile, uploadAvatar } from "../services/profile";

import "../styles/profile-settings.css";

function ProfileSettings() {
    const profile = useProfileStore((state) => state.profile);

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [saving, setSaving] = useState(false);

    const fileInput = useRef(null);

    const setProfile = useProfileStore((state) => state.setProfile);

    const hasChanges =
        fullName !== (profile?.full_name ?? "") ||
        username !== (profile?.username ?? "");

    async function handleSave() {
        const { data, error } = await updateProfile(profile.id, {
            full_name: fullName,
            username,
        });

        if (error) {
            console.error(error);
            return;
        }

        setProfile(data);
    }

    async function handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setSaving(true);

        const { data: avatar, error } = await uploadAvatar(profile.id, file);

        if (!error) {
            const result = await updateProfile(profile.id, {
                avatar_url: avatar,
            });
            setProfile(result.data);
        }

        setSaving(false);
    }

    useEffect(() => {
        if (!profile) return;

        setFullName(profile.full_name ?? "");
        setUsername(profile.username ?? "");
    }, [profile]);

    return (
        <section className="settings-section">
            <div className="settings-section-header">
                <h2>Profile</h2>
                <p>Update your public profile information.</p>
            </div>

            <div className="profile-settings">
                <div className="profile-avatar-section">
                    <div className="profile-avt">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" />
                        ) : (
                            <span>
                                {(profile?.full_name ??
                                    profile?.username ??
                                    "A")
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>
                        )}

                        <input
                            ref={fileInput}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarUpload}
                        />
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInput.current?.click()}
                    >
                        <Camera size={16} />
                        Change Photo
                    </Button>
                </div>

                <div className="profile-fields">
                    <div className="profile-field">
                        <label>Full Name</label>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="profile-field">
                        <label>Username</label>
                        <div className="username-input">
                            <span>@</span>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={!hasChanges || saving}
                        onClick={handleSave}
                        className="profile-save"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default ProfileSettings;
