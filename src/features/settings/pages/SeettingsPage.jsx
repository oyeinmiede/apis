import { useState } from "react";

import AppShell from "@/components/layout/AppShell";
import PageContainer from "@/components/layout/PageContainer";

import AppearanceSettings from "../components/AppearanceSettings";
import ProfileSettings from "../components/ProfileSettings";
import SettingsSidebar from "../components/SettingsSidebar";

import "../styles/settings.css";
import AccountSettings from "../components/AccountSettings";
import WorkspaceSettings from "../components/Workspace/WorkspaceSettings";
import AboutSettings from "../components/Aboutsettings";

function SettingsPage() {

    const [active, setActive] =
        useState("appearance");

    return (
        <AppShell>
            <PageContainer>

                <div className="settings-page">

                    <div className="settings-header">

                        <h1>Settings</h1>

                        <p>
                            Personalize your Apis experience.
                        </p>

                    </div>

                    <div className="settings-layout">

                        <SettingsSidebar
                            active={active}
                            onChange={setActive}
                        />

                        <div className="settings-content">

                            {active === "appearance" && (
                                <AppearanceSettings />
                            )}

                            {active === "profile" && (
                                <ProfileSettings />
                            )}

                            {active === "account" && (
                                <AccountSettings />
                            )}

                            {active === "workspace" && (
                                <WorkspaceSettings />
                            )}

                            {active === "about" && (
                                <AboutSettings />
                            )}

                        </div>

                    </div>

                </div>

            </PageContainer>
        </AppShell>
    );
}

export default SettingsPage;