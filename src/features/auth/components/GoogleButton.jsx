import { FcGoogle } from "react-icons/fc";
import "../styles/google-button.css";

function GoogleButton() {
    return (
        <button className="google-button">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
        </button>
    );
}

export default GoogleButton;