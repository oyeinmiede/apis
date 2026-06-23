import "../styles/auth-modal.css";

function AuthModal({ children, }) {
    return (
        <section className="auth-modal">
            {children}
        </section>
    );
}

export default AuthModal;