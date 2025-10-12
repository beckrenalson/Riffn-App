import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import BackBtn from "../BackBtn";
import SelectLocation from "./SelectLocation";
import ProfileImageUpload from "./ProfileImageUpload";
import BandMembersInput from "./BandMembersInput";
import Bio from "./Bio";

function CreateUser() {
    const navigate = useNavigate();

    const [useFullName, setUseFullName] = useState(false);
    const [members, setMembers] = useState([]);

    const userData = UserStore((state) => state.userData);
    const setUserData = UserStore((state) => state.setUserData);
    const setProfileImage = UserStore((state) => state.setProfileImage);
    const setBandMembers = UserStore((state) => state.setBandMembers);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContinue = (e) => {
        e.preventDefault();
        setBandMembers(members);
        navigate("/signup/instruments");
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

            {/* Profile Image Section */}
            <div className="relative z-10 px-6 pt-4">
                <ProfileImageUpload
                    onImageChange={setProfileImage}
                    initialImage={userData.profileImage}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-6">

                    {/* Name Input Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                        <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                            {userData.profileType === "solo" ? "Stage Name" : "Band Name"}
                        </label>
                        <input
                            className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                            placeholder={
                                userData.profileType === "solo"
                                    ? "Enter stage name"
                                    : "Enter band name"
                            }
                            type="text"
                            value={userData.userName}
                            onChange={handleChange}
                            required
                            name="userName"
                            disabled={useFullName}
                        />

                        {userData.profileType === "solo" && (
                            <div className="mt-4">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">Use real name instead</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={useFullName}
                                            onChange={(e) => {
                                                setUseFullName(e.target.checked);
                                                setUserData((prev) => ({
                                                    ...prev,
                                                    userName: e.target.checked
                                                        ? `${userData.firstName || ''} ${userData.lastName || ''}`
                                                        : ''
                                                }));
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-blue-600 transition-all"></div>
                                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5"></div>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Location Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                        <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                            Location
                        </label>
                        <SelectLocation
                            userData={userData}
                            handleChange={handleChange}
                        />
                    </div>

                    {/* Band Members Section */}
                    {userData.profileType === "band" && (
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                            <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                                Band Members
                            </label>
                            <BandMembersInput members={members} setMembers={setMembers} />
                        </div>
                    )}

                    {/* Bio Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                        <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                            Bio
                        </label>
                        <Bio userData={userData} setUserData={setUserData} />
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 uppercase tracking-wider text-sm shadow-lg"
                    >
                        Continue
                    </button>

                </div>
            </div>
        </div>
    );
}

export default CreateUser;