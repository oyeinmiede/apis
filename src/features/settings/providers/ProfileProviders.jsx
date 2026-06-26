import { useEffect } from "react";

import useAuthStore from "@/app/store/authStore";
import useProfileStore from "@/app/store/profileStore";

import { getProfile } from "../services/profile";

function ProfileProvider({ children }) {
    const user = useAuthStore((state) => state.user);

    const setProfile = useProfileStore(
        (state) => state.setProfile
    );

    useEffect(() => {
        if (!user) return;

        async function loadProfile() {
            const { data, error } = await getProfile(user.id);

            if (error) {
                console.error(error);
                return;
            }

            setProfile(data);
        }

        loadProfile();
    }, [user]);

    return children;
}

export default ProfileProvider;