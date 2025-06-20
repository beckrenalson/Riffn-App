import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";
import API_URL from "../../config/api";

function FinalSignUp() {
    const navigate = useNavigate()
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("userName", signUpData.userName);
        formData.append("firstName", signUpData.firstName);
        formData.append("lastName", signUpData.lastName);
        formData.append("email", signUpData.email);
        formData.append("password", signUpData.password);
        formData.append("profileType", signUpData.profileType);
        formData.append("location", signUpData.location)

        signUpData.selectedGenres.forEach((genre) => formData.append("selectedGenres[]", genre));
        signUpData.selectedInstruments.forEach((inst) => formData.append("selectedInstruments[]", inst));

        if (signUpData.profileImage) {
            formData.append("profileImage", signUpData.profileImage);
        }

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setSignUpData(data);
                if (signUpData.profileType === "solo") {
                    navigate("/search/band");
                } else {
                    navigate("/search/solo")
                }

            } else {
                console.error("Signup failed:", response.statusText);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <>
            <p>User/Band name:</p> {signUpData.userName}
            <p>Name: {signUpData.firstName + " " + signUpData.lastName}</p>
            <p>Email: {signUpData.email}</p>
            <p>Instruments Played: {signUpData.selectedInstruments.join(', ')}</p>
            <p>Genres Played: {signUpData.selectedGenres.join(', ')}</p>
            <p>Location: {signUpData.location}</p>
            {/* <p>Members: {signUpData.bandMembers.map((member) => member.name).join(', ')}</p> */}
            <div className="flex items-center justify-center h-screen">
                <button
                    onClick={handleSubmit}
                    className="border p-2">SIGN UP</button>
            </div>
        </>
    )
}

export default FinalSignUp