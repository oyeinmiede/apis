import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuthStore from "@/app/store/authStore";

import {
    createWorkspace,
    addWorkspaceMember,
} from "../services/workspaces";

function OnboardingPage() {
    const navigate = useNavigate();

    const user = useAuthStore(
        (state) => state.user
    );

    const [workspaceName, setWorkspaceName] =
        useState(
            user?.email?.split("@")[0]
                ? `${user.email.split("@")[0]}'s Hive`
                : ""
        );

    async function handleCreateWorkspace() {
        if (!workspaceName.trim())
            return;

        const { data, error } =
            await createWorkspace({
                name: workspaceName,
                ownerId: user.id,
            });

        if (error) {
            console.error(error);
            return;
        }

        await addWorkspaceMember({
            workspaceId: data.id,
            userId: user.id,
            role: "owner",
        });

        navigate("/dashboard");
    }

    return (
        <div className="onboarding-page">
            <div className="onboarding-card">
                <h1>
                    Welcome to Apis
                </h1>

                <p>What should we call your hive?</p>

                <Input
                    value={workspaceName}
                    onChange={(e) =>
                        setWorkspaceName(
                            e.target.value
                        )
                    }
                />

                <Button onClick={handleCreateWorkspace}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default OnboardingPage;