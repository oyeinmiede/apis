import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../styles/password-input.css";

import { Input } from "@/components/ui/input";

function PasswordInput(props) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="password-wrapper">
            <Input
                {...props}
                type={visible ? "text" : "password"}
            />

            <button
                type="button"
                onClick={() =>
                    setVisible(!visible)
                }
            >
                {visible ? (
                    <EyeOff size={18} />
                ) : (
                    <Eye size={18} />
                )}
            </button>
        </div>
    );
}

export default PasswordInput;