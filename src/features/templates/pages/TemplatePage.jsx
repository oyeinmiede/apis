import { useMemo, useState } from "react";

import AppShell from "@/components/layout/AppShell";
import PageContainer from "@/components/layout/PageContainer";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

import templates from "../data/templates";
import TemplateCard from "../components/TemplateCard";

import "../styles/templates.css";

function TemplatePage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = [
        "All",
        ...new Set(
            templates.map(t => t.category)
        ),
    ];

    const filtered = useMemo(() => {

        return templates.filter(t => {

            const matchCategory =
                category === "All" ||
                t.category === category;

            const matchSearch =
                t.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return matchCategory && matchSearch;

        });

    }, [search, category]);

    function useTemplate(template) {

        console.log(template);

    }

    return (

        <AppShell>

            <PageContainer>

                <div className="templates-page">

                    <div className="templates-header">

                        <h1>
                            Templates
                        </h1>

                        <p>
                            Start faster with ready-made boards.
                        </p>

                    </div>

                    <div className="templates-banner">

                        <Info size={22} />

                        <div>

                            <h3>Templates Preview</h3>

                            <p>
                                These templates are currently visual previews only.
                                Fully functional templates will be available in a future update.
                            </p>

                        </div>

                    </div>

                    <Input
                        placeholder="Search templates..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div className="template-filters">

                        {categories.map(c => (

                            <button
                                key={c}
                                className={
                                    category === c
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCategory(c)
                                }
                            >
                                {c}
                            </button>

                        ))}

                    </div>

                    <div className="templates-grid">

                        {filtered.map(template => (

                            <TemplateCard
                                key={template.id}
                                template={template}
                                onUse={useTemplate}
                            />

                        ))}

                    </div>

                </div>

            </PageContainer>

        </AppShell>

    );

}

export default TemplatePage;