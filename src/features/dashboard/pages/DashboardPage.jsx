import AppShell from "../../../components/layout/AppShell";
import PageContainer from "../../../components/layout/PageContainer";

import GreetingSection from "../components/GreetingSection";
import AiLauncher from "../components/AiLauncher";
import RecentBoardsSection from "../components/RecentBoardsSection";

const user = {
    name: "Gabrielle",
};

function DashboardPage() {
    return (
        <AppShell>
            <PageContainer>
                <GreetingSection user={user} />
                <AiLauncher />
                <div
                    style={{
                        marginTop: "48px",
                    }}
                >
                    <RecentBoardsSection />
                </div>
            </PageContainer>
        </AppShell>
    );
}

export default DashboardPage;