import SectionHeader from "./SectionHeader";
import TemplateCard from "./TemplateCard";
import { templates } from "../data/templates";
import "../styles/templates-section.css";
import { Button } from "@/components/ui/button";

function TemplateSection() {
    return (
        <section className="templates-section">
            <SectionHeader
                title="Templates"
                action={
                    <Button variant="ghost" size="xs">
                        Browse all
                    </Button>
                }
            />
            <div className="templates-grid">
                {
                    templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            {...template}
                        />
                    ))
                }
            </div>
        </section>
    );
}

export default TemplateSection;