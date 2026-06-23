import AppShell from "../../../components/layout/AppShell";
import PageContainer from "../../../components/layout/PageContainer";

import GreetingSection from "../components/GreetingSection";
import CommandBar from "../components/CommandBar";
import BoardCard from "../components/BoardCard";

function DashboardPage() {
    return (
        <AppShell>
            <PageContainer>
                <GreetingSection />

                <CommandBar />

                <div
                    style={{
                        marginTop: "48px",
                    }}
                >
                    <h2>
                        Recent Boards
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4, 1fr)",
                            gap: "16px",
                            marginTop: "16px",
                        }}
                    >
                        <BoardCard />
                        <BoardCard />
                        <BoardCard />
                        <BoardCard />
                    </div>
                </div>
            </PageContainer>
        </AppShell>
    );
}

export default DashboardPage;