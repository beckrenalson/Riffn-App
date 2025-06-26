import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";
import { USERS_ENDPOINT } from "../../config/api";

function FinalSignUp() {
    const navigate = useNavigate()
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("selected-instruments-storage");
        localStorage.removeItem("selected-genres-storage");

        const formData = new FormData();

        formData.append("userName", signUpData.userName);
        formData.append("firstName", signUpData.firstName);
        formData.append("lastName", signUpData.lastName);
        formData.append("email", signUpData.email);
        formData.append("password", signUpData.password);
        formData.append("profileType", signUpData.profileType);
        formData.append("location", signUpData.location)
        formData.append("bio", signUpData.bio)

        signUpData.selectedGenres.forEach((genre) => formData.append("selectedGenres[]", genre));
        signUpData.selectedInstruments.forEach((inst) => formData.append("selectedInstruments[]", inst));
        signUpData.bandMembers.forEach((member) => formData.append("bandMembers", member))

        if (signUpData.profileImage) {
            formData.append("profileImage", signUpData.profileImage);
        }

        try {
            const response = await fetch(USERS_ENDPOINT, {
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
            <p>Members: {signUpData.bandMembers.map((member) => member.name).join(', ')}</p>
            <div className="flex items-center justify-center h-screen">
                <button
                    onClick={handleSubmit}
                    className="border p-2">SIGN UP</button>
            </div>
        </>
    )
}

export default FinalSignUp