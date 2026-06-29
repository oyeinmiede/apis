import { useRef } from "react";

function OTPInput({ value, onChange }) {
    const inputs = useRef([]);
    function handleChange(e, index) {
        const char = e.target.value;
        if (!/^\d*$/.test(char)) return;
        const otp = value.split("");
        otp[index] = char;
        onChange(otp.join(""));
        if (char && index < 7) {
            inputs.current[index + 1].focus();
        }
    }

    function handlePaste(e) {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 8);
    
        if (!pasted) return;
        onChange(pasted);    
        const last = Math.min(pasted.length - 1, 7);
        inputs.current[last]?.focus();
    }


    function handleKeyDown(e, index) {
        if (
            e.key === "Backspace" &&
            !value[index] &&
            index > 0
        ) {
            inputs.current[index - 1].focus();
        }
    }

    return (
        <div className="otp-container" onPaste={handlePaste}>
            {Array.from({ length: 8 }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) =>
                        inputs.current[index] = el
                    }
                    className="otp-box"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={
                        value[index] || ""
                    }
                    onChange={(e) =>
                        handleChange(e, index)
                    }
                    onKeyDown={(e) =>
                        handleKeyDown(e, index)
                    }
                />
            ))}
        </div>
    );
}

export default OTPInput;