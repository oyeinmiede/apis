import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../styles/template-card.css";

function TemplateCard({
    title,
    category,
    description,
}) {

    return (
        <article className="template-card">
            <div className="template-preview">
                <div className="hex-preview"></div>
            </div>
            <div className="template-info">
                <span className="template-category">{category}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Button variant="ghost" size="sm">
                    Use Template
                    <ArrowRight size={15} />
                </Button>
            </div>
        </article>
    );
}


export default TemplateCard;