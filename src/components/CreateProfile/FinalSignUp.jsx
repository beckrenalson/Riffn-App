import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";

function FinalSignUp() {

    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData)
            })
            if (response.ok) {
                navigate("/signup/userselection", { state: { signUpData } })
            }
        } catch (error) {
            console.error("Signup error:", error)
        }
    };

    console.log(signUpData)

    return (
        <>
        </>
    )
}

export default FinalSignUp