import AppShell from "../../../components/layout/AppShell";
import PageContainer from "../../../components/layout/PageContainer";

import GreetingSection from "../components/GreetingSection";
import AiLauncher from "../components/AiLauncher";
import RecentBoardsSection from "../components/RecentBoardsSection";
import HiveActivityPanel from "../components/HiveActivityPanel";

import '../styles/dashboard-layout.css'
import TemplateSection from "../components/TemplateSection";
import useProfileStore from "@/app/store/profileStore";

function DashboardPage() {
    const profile = useProfileStore(
        state => state.profile
    );

    return (
        <AppShell>
            <PageContainer>
                <GreetingSection profile={profile}/>
                <AiLauncher />
                <div className="dashboard-grid">
                    <div><RecentBoardsSection /></div>
                    <HiveActivityPanel />
                </div>
                <TemplateSection />
            </PageContainer>
        </AppShell>
    );
}

export default DashboardPage;