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
        <>
            <BackBtn />
            <div className="max-h-screen p-4">
                <ProfileImageUpload
                    onImageChange={setProfileImage}
                    initialImage={userData.profileImage}
                />

                <div>
                    <input
                        className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none mt-6 mb-4"
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
                        <div className="mb-6">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <span className="text-sm">Use real name instead</span>
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
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5"></div>
                                </div>
                            </label>
                        </div>

                    )}
                </div>

                <div className="mb-4">
                    <SelectLocation
                        userData={userData}
                        handleChange={handleChange}
                    />
                </div>

                {userData.profileType === "band" && (
                    <BandMembersInput members={members} setMembers={setMembers} />
                )}

                <div>
                    <Bio userData={userData} setUserData={setUserData} />
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full border p-2 rounded-2xl cursor-pointer mt-4 mb-10"
                >
                    CONTINUE
                </button>
            </div>
        </>
    );
}

export default CreateUser;
