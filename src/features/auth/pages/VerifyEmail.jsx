import {
    useState
} from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";


import AuthLayout from "../components/AuthLayout";
import AuthModal from "../components/AuthModal";

import OTPInput from "./OTPInput";

import {
    Button
} from "@/components/ui/button";


import {
    verifyEmail,
    resendEmailOtp
} from "@/services/supabase/auth";


function VerifyEmail() {

    const navigate =
        useNavigate();


    const [params] =
        useSearchParams();


    const email =
        params.get("email");


    const [otp,setOtp] =
        useState("");


    const [loading,setLoading] =
        useState(false);


    const [error,setError] =
        useState("");


    async function handleVerify(e){

        e.preventDefault();

        if(
            otp.length !== 8
        ){
            setError(
                "Enter the 8 digit code"
            );
            return;
        }


        setLoading(true);
        setError("");


        const {
            error
        } =
        await verifyEmail({
            email,
            token: otp,
        });


        if(error){
            setError(
                error.message
            );
            setLoading(false);
            return;
        }


        navigate("/onboarding");

    }


    async function handleResend(){

        await resendEmailOtp(
            email
        );

    }


    return (
        <AuthLayout>

            <div className='otp'>

                <h1>
                    Verify your email
                </h1>


                <p className="auth-subtitle">
                    Enter the 8 digit code we sent to
                    <br />
                    {email}
                </p>


                <form
                    className="auth-form"
                    onSubmit={handleVerify}
                >

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                    />


                    {
                        error &&
                        <p className="auth-error">
                            {error}
                        </p>
                    }


                    <Button
                        disabled={loading}
                        className="auth-submit"
                    >
                        {
                            loading
                            ? "Verifying..."
                            : "Verify email"
                        }
                    </Button>

                </form>


                <button
                    className="auth-link"
                    onClick={handleResend}
                >
                    Resend code
                </button>


            </div>

        </AuthLayout>
    );
}


export default VerifyEmail;