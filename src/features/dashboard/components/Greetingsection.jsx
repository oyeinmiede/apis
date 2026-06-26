import "./../styles/greeting-section.css";

function GreetingSection({ profile }) {
    const displayName =
        profile?.full_name ??
        profile?.username ??
        profile?.email?.split("@")[0] ??
        "there";

    return (
        <section className="greeting-section">
            <h1>Welcome back, {displayName}</h1>
            <p>What would you like to work on today?</p>
        </section>
    );
}

export default GreetingSection;