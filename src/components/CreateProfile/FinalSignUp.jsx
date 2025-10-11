import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import api from "../../services/api"; // Import api and USERS_ENDPOINT
import BackBtn from "../BackBtn";
import { useState } from "react";

function FinalSignUp() {
    const navigate = useNavigate();
    const userData = UserStore((state) => state.userData);
    const setUserData = UserStore((state) => state.setUserData);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("selected-instruments-storage");
        localStorage.removeItem("selected-genres-storage");

        const payload = {
            ...userData,
            profileImage: userData.profileImage || null,
        };

        try {
            const response = await api.post('auth/signup', payload); // Use api.post

            const data = response.data;

            if (response.status === 201) { // Changed from 200 to 201
                // Instead of setUserData(data) directly
                setUserData({
                    _id: data._id,
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    bio: data.bio,
                    profileType: data.profileType,
                    profileImage: data.profileImage,
                    location: data.location,
                    selectedGenres: data.selectedGenres,
                    selectedInstruments: data.selectedInstruments,
                    bandMembers: data.bandMembers || [],
                    bands: data.bands || [],
                });

                const target = data.profileType === "solo" ? "band" : "solo";
                navigate(`/search/${target}`);
            } else if (data.errors) {
                // Handle field errors if your backend returns { errors: [...] }
                const fieldErrors = data.errors.reduce(
                    (acc, e) => ({ ...acc, [e.param]: e.msg }),
                    {}
                );
                console.error("Signup validation errors:", fieldErrors);
            } else if (data.error) {
                console.error("Signup error:", data.error);
            }
        } catch (error) {
            console.error("Signup request failed:", error);
            if (error.response && error.response.status === 409) {
                setErrorMessage(error.response.data.errors[0].msg);
            } else {
                setErrorMessage("An unexpected error occurred during signup.");
            }
        }
    };

    return (
        <>
            <BackBtn />

            <div className="mt-10 mx-4 shadow-xl rounded-2xl border border-gray-500 p-6 space-y-2">
                <h2 className="text-2xl font-bold text-center">Review Your Details</h2>

                <div>
                    <p className="text-sm text-gray-500">User/Band Name:</p>
                    <p className="text-lg font-medium">{userData.userName}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Full Name:</p>
                    <p className="text-lg font-medium">
                        {userData.firstName} {userData.lastName}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="text-lg font-medium">{userData.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Instruments Played:</p>
                    <p className="text-lg font-medium">
                        {(userData.selectedInstruments || []).join(", ")}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Genres Played:</p>
                    <p className="text-lg font-medium">
                        {(userData.selectedGenres || []).join(", ")}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Location:</p>
                    <p className="text-lg font-medium">{userData.location}</p>
                </div>

                {userData.bandMembers?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500">Band Members:</p>
                        <p className="text-lg font-medium">
                            {userData.bandMembers.map((m) => m.userName || m.firstName).join(", ")}
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

            {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                    {errorMessage}
                </div>
            )}
        </>
    );
}

export default FinalSignUp;
