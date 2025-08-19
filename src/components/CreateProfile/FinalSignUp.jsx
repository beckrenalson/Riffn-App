import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";
import { USERS_ENDPOINT } from "../../config/api";
import BackBtn from "../BackBtn";

function FinalSignUp() {
    const navigate = useNavigate()
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("selected-instruments-storage");
        localStorage.removeItem("selected-genres-storage");

        const payload = {
            userName: signUpData.userName,
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            email: signUpData.email,
            password: signUpData.password,
            profileType: signUpData.profileType,
            location: signUpData.location,
            bio: signUpData.bio,
            selectedGenres: signUpData.selectedGenres,
            selectedInstruments: signUpData.selectedInstruments,
            bandMembers: signUpData.bandMembers,
            profileImage: signUpData.profileImage || null,
        };

        try {
            const response = await fetch(USERS_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setSignUpData(data);
                if (signUpData.profileType === "solo") {
                    navigate("/search/band");
                } else {
                    navigate("/search/solo");
                }
            } else {
                const errorData = await response.json();
                console.error("Signup failed:", errorData);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <>
            <BackBtn />

            <div className="mt-10 mx-4 shadow-xl rounded-2xl border border-gray-500 p-6 space-y-2">
                <h2 className="text-2xl font-bold text-center">Review Your Details</h2>

                <div>
                    <p className="text-sm text-gray-500">User/Band Name:</p>
                    <p className="text-lg font-medium">{signUpData.userName}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Full Name:</p>
                    <p className="text-lg font-medium">{signUpData.firstName + " " + signUpData.lastName}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="text-lg font-medium">{signUpData.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Instruments Played:</p>
                    <p className="text-lg font-medium">{signUpData.selectedInstruments.join(', ')}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Genres Played:</p>
                    <p className="text-lg font-medium">{signUpData.selectedGenres.join(', ')}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Location:</p>
                    <p className="text-lg font-medium">{signUpData.location}</p>
                </div>

                {signUpData.bandMembers.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500">Band Members:</p>
                        <p className="text-lg font-medium">
                            {signUpData.bandMembers.join(', ')}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-8 mb-20">
                <button
                    onClick={handleSubmit}
                    className="w-full border p-2 rounded-2xl cursor-pointer mx-4"
                >
                    SIGN UP
                </button>
            </div>
        </>

    )
}

export default FinalSignUp