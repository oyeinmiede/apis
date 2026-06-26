import './styles/sidebar.css'
import { NavLink } from "react-router-dom"
import { navigationItems, settingsItem } from "./navigation"
import WorkspaceSwitcher from "./WorkspaceSwitcher";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <img src="/logo-apis.png" alt="" />
                </div>
                <span>Apis</span>
            </div>
            <WorkspaceSwitcher />
            <nav className="sidebar-nav">
                {navigationItems.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}

                <NavLink to={settingsItem.path} className={({ isActive }) => `nav-item settings-link ${isActive ? "active" : ""}`}>
                    <settingsItem.icon size={18} />
                    {settingsItem.label}
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar