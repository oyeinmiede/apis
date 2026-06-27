import AppShell from "../../../components/layout/AppShell";
import PageContainer from "../../../components/layout/PageContainer";

import GreetingSection from "../components/GreetingSection";
import AiLauncher from "../components/AiLauncher";
import RecentBoardsSection from "../components/RecentBoardsSection";

import '../styles/dashboard-layout.css'
import TemplateSection from "../components/TemplateSection";
import useProfileStore from "@/app/store/profileStore";
import ActivityFeed from "../components/ActivityFeed";

import useWorkspaceStore from "@/app/store/workspaceStore";

function DashboardPage() {
    const profile = useProfileStore(
        state => state.profile
    );

    const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)

    return (
        <AppShell>
            <PageContainer>
                <GreetingSection profile={profile}/>
                <AiLauncher />
                <div className="dashboard-grid">
                    <div><RecentBoardsSection /></div>
                    <ActivityFeed workspaceId={currentWorkspace?.id} />
                </div>
                <TemplateSection />
            </PageContainer>
        </AppShell>
    );
}

export default DashboardPage;