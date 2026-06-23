import { Sparkles } from "lucide-react";

import "../styles/ai-launcher.css";

function AiLauncher() {
    return (
        <section className="ai-launcher">
            <div className="ai-launcher-header">
                <Sparkles size={18} />

                <span>Ask Hexa</span>
            </div>

            <h2>What would you like to create?</h2>
            <p>Describe a workflow, brainstorm, project plan, or idea.</p>
            <input
                type="text"
                placeholder="Create a product roadmap for a student startup..."
            />

            <div className="ai-launcher-actions">
                <button>Generate</button>
                <button className="secondary">New Board</button>
            </div>
        </section>
    );
}

export default AiLauncher;