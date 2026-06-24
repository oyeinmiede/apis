import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useWorkspaceStore from "@/app/store/workspaceStore";
import useAuthStore from "@/app/store/authStore";

import {
    createWorkspace,
    addWorkspaceMember,
} from "../services/workspaces";

import "../styles/onboarding.css"

function OnboardingPage() {
    const navigate = useNavigate();

    const user = useAuthStore(
        (state) => state.user
    );

    const emailName =
        user?.email?.split("@")[0];

    const defaultName =
        emailName
            ? `${emailName.charAt(0).toUpperCase()}${emailName.slice(1)}'s Hive`
            : "";

    const [workspaceName, setWorkspaceName] = useState(defaultName);

    const setCurrentWorkspace =
        useWorkspaceStore(
            state =>
                state.setCurrentWorkspace
        );

    async function handleCreateWorkspace() {
        if (!workspaceName.trim())
            return;

        const result = await createWorkspace({
            name: workspaceName,
            ownerId: user.id,
        });

        const { data, error } = result;

        if (error) {
            console.error(error);
            return;
        }

        await addWorkspaceMember({
            workspaceId: data.id,
            userId: user.id,
            role: "owner",
        });
        setCurrentWorkspace(data)
        navigate("/dashboard");
    }

    return (
        <div className="onboarding-page">
            <div className="onboarding-card">
                <img
                    src="/logo-apis.png"
                    alt="Apis"
                    className="onboarding-logo"
                />
                <div className="onboarding-heading">
                    <h1>Welcome to Apis</h1>
                    <p>
                        Let's create your first hive and start building together.
                    </p>
                </div>
                <div className="onboarding-form">
                    <label className="onboarding-label">
                        Hive Name
                    </label>
                    <Input
                        value={workspaceName}
                        onChange={(e) =>
                            setWorkspaceName(
                                e.target.value
                            )
                        }
                    />
                    <Button
                        className="onboarding-submit"
                        onClick={
                            handleCreateWorkspace
                        }
                    >
                        Continue
                    </Button>
                </div>
                <p className="onboarding-hint">
                    You can change this later in settings.
                </p>
            </div>
        </div>
    );
}

export default OnboardingPage;