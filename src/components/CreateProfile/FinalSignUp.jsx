import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";

function FinalSignUp() {
    const API_URL = import.meta.env.VITE_RIFFN_API

    const navigate = useNavigate()
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData),
            });

            if (response.ok) {
                const data = await response.json();
                setSignUpData(data);

                localStorage.setItem("userId", data._id);

                navigate("/search/bands");
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    console.log(signUpData)

    return (
        <>
            <p>Name: {signUpData.firstName + " " + signUpData.lastName}</p>
            <p>Email: {signUpData.email}</p>
            <p>Intruments Played: {signUpData.selectedInstruments}</p>
            <p>Genres Played: {signUpData.selectedGenres}</p>
            <div className="flex items-center justify-center h-screen">
                <button
                    onClick={handleSubmit}
                    className="border p-2">SIGN UP</button>
            </div>
        </>
    )
}

export default FinalSignUp