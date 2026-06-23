import AppShell from "../../../components/layout/AppShell";
import PageContainer from "../../../components/layout/PageContainer";

import GreetingSection from "../components/GreetingSection";
import AiLauncher from "../components/AiLauncher";
import RecentBoardsSection from "../components/RecentBoardsSection";
import HiveActivityPanel from "../components/HiveActivityPanel";

import '../styles/dashboard-layout.css'

const user = {
    name: "Gabrielle",
};

function DashboardPage() {
    return (
        <AppShell>
            <PageContainer>
                <GreetingSection user={user} />
                <AiLauncher />
                <div className="dashboard-grid">
                    <div><RecentBoardsSection /></div>
                    <HiveActivityPanel />
                </div>                
            </PageContainer>
        </AppShell>
    );
}

export default DashboardPage;