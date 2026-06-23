import { Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
            <Input placeholder="Create a product roadmap for a student startup..." />
            <div className="ai-launcher-actions">
                <Button>Generate</Button>
                <Button variant="secondary">New Board</Button>
            </div>
        </section>
    );
}

export default AiLauncher;