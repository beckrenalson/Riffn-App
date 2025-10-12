import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import api from "../../services/api";
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
            const response = await api.post('auth/signup', payload);

            const data = response.data;

            if (response.status === 201) {
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
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Navigation */}
            <div className="relative z-10">
                <div className="px-6 py-4">
                    <BackBtn />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-6">

                    {/* Title Section */}
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                            Review Your Details
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Please confirm your information before signing up
                        </p>
                    </div>

                    {/* Details Card */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
                        <div className="divide-y divide-zinc-800/30 p-6 space-y-4">

                            <div className="pt-2">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                                    {userData.profileType === "band" ? "Band Name" : "User Name"}
                                </p>
                                <p className="text-base text-zinc-100">{userData.userName}</p>
                            </div>

                            <div className="pt-4">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                                    Full Name
                                </p>
                                <p className="text-base text-zinc-100">
                                    {userData.firstName} {userData.lastName}
                                </p>
                            </div>

                            <div className="pt-4">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                                    Email
                                </p>
                                <p className="text-base text-zinc-100">{userData.email}</p>
                            </div>

                            <div className="pt-4">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                                    Location
                                </p>
                                <p className="text-base text-zinc-100">{userData.location}</p>
                            </div>

                            {userData.bio && (
                                <div className="pt-4">
                                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                                        Bio
                                    </p>
                                    <p className="text-sm text-zinc-300 whitespace-pre-line">{userData.bio}</p>
                                </div>
                            )}

                            <div className="pt-4">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                    {userData.profileType === "band" ? "Instruments Needed" : "Instruments Played"}
                                </p>
                                {userData.selectedInstruments && userData.selectedInstruments.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {userData.selectedInstruments.map((instrument, index) => (
                                            <span
                                                key={index}
                                                className="bg-violet-500/10 border border-violet-500/30 text-violet-300 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                {instrument}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500 italic">None selected</p>
                                )}
                            </div>

                            <div className="pt-4">
                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                    Preferred Genres
                                </p>
                                {userData.selectedGenres && userData.selectedGenres.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {userData.selectedGenres.map((genre, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500 italic">None selected</p>
                                )}
                            </div>

                            {userData.bandMembers?.length > 0 && (
                                <div className="pt-4">
                                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                        Band Members
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.bandMembers.map((member, index) => (
                                            <span
                                                key={index}
                                                className="bg-zinc-700/50 border border-zinc-600/50 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                {member.userName || member.firstName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl">
                            {errorMessage}
                        </div>
                    )}

                    {/* Sign Up Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 uppercase tracking-wider text-sm shadow-lg"
                    >
                        Sign Up
                    </button>

                </div>
            </div>
        </div>
    );
}

export default FinalSignUp;