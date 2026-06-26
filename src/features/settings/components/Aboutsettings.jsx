import {Globe,Heart,Code2,ExternalLink} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import {Button} from "@/components/ui/button";

import "../styles/settings.css";

function AboutSettings(){

    return(
        <section className="settings-section">

            <div className="settings-section-header">
                <h2>About Apis</h2>
                <p>Information about the application.</p>
            </div>

            <div className="settings-card">

                <div className="about-app">

                    <div className="about-logo">
                        <img src="/logo-apis.png" alt="" />
                    </div>

                    <div>

                        <h3>Apis</h3>

                        <span>
                            Version 0.1.0
                        </span>

                    </div>

                </div>

                <p className="about-description">
                    Apis is a collaborative whiteboard built for students,
                    teams and creators. Organize ideas, build projects and
                    collaborate together in beautiful workspaces.
                </p>

            </div>

            <div className="settings-card">

                <h3>Developer</h3>

                <div className="about-row">

                    <div>

                        <strong>
                            Gabrielle Duere
                        </strong>

                        <p>
                            Frontend Developer • Videographer
                        </p>

                    </div>

                </div>

            </div>

            <div className="settings-card">

                <h3>Links</h3>

                <div className="about-links">

                    <Button
                        variant="outline"
                        asChild
                    >
                        <a
                            href="https://github.com/oyeinmiede"
                            target="_blank"
                        >
                            <FaGithub size={16}/>
                            GitHub
                            <ExternalLink size={14}/>
                        </a>
                    </Button>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <a
                            href="https://gabrielleduere.vercel.app"
                            target="_blank"
                        >
                            <Globe size={16}/>
                            Website
                            <ExternalLink size={14}/>
                        </a>
                    </Button>

                </div>

            </div>

            <div className="settings-card">

                <div className="about-footer">

                    <div>
                        <Code2 size={18}/>
                        <span>
                            Built with React, Vite, Shadcn UI and Supabase.
                        </span>
                    </div>

                    <div>
                        <Heart size={18}/>
                        <span>
                            Crafted with care in Nigeria.
                        </span>
                    </div>

                </div>

            </div>

        </section>
    );

}

export default AboutSettings;