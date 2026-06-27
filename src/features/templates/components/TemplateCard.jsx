import {Button} from "@/components/ui/button";
import "../styles/templates.css";
import { ArrowRight } from "lucide-react";

function TemplateCard({template,onUse}){

    return(

        <div className="template-page-card">

            <div
                className="template-cover"
                style={{
                    background:template.coverColor,
                }}
            >
                <span className="template-emoji">
                    {template.emoji}
                </span>
            </div>

            <div className="template-body">

                <span className="template-category">
                    {template.category}
                </span>

                <h3>
                    {template.title}
                </h3>

                <p>
                    {template.description}
                </p>

            </div>

            <Button
                variant="ghost"
                onClick={()=>onUse(template)}
            >
                Use Template
                <ArrowRight size={16} />
            </Button>

        </div>

    );

}

export default TemplateCard;