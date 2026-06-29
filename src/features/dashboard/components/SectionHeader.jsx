import "./../styles/section-header.css";

function SectionHeader({ title, action, }) {
    return (
        <div className="section-header">
            <h2>{title}</h2>
            {action}
        </div>
    );
}

export default SectionHeader;