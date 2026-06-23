import "./../styles/greeting-section.css";

function GreetingSection({ user }) {
    return (
        <section className="greeting-section">
            <h1>Welcome back, {user.name}</h1>
            <p>What would you like to work on today?</p>
        </section>
    );
}

export default GreetingSection;