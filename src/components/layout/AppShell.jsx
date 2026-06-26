import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./styles/app-shell.css";

function AppShell({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />

            <div className="workspace-area">
                <Topbar />

                <main className="app-shell-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppShell;