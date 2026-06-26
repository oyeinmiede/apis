import AppShell from "@/components/layout/AppShell";
import PageContainer from "@/components/layout/PageContainer";

import BoardsHeader from "../components/BoardsHeader";
import BoardsGrid from "../components/BoardsGrid";

import "../styles/boards-page.css";
import BoardsToolbar from "../components/BoardsToolbar";
import { useState } from "react";
import BoardsStats from "../components/BoardStats";

function BoardsPage() {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("updated");
    return (
        <AppShell>
            <PageContainer>
                <BoardsHeader />
                <BoardsStats />
                <BoardsToolbar query={query} setQuery={setQuery} sort={sort} setSort={setSort} />
                <BoardsGrid query={query} sort={sort} />
            </PageContainer>
        </AppShell>
    );
}

export default BoardsPage;