import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpStore from "./SignUpStore";
import BackBtn from "../BackBtn";
import SelectLocation from "./SelectLocation";
import ProfileImageUpload from "./ProfileImageUpload";
import BandMembersInput from "./BandMembersInput";
import Bio from "./Bio";

function CreateUser() {
    const navigate = useNavigate();

    const [useFullName, setUseFullName] = useState(false);
    const [members, setMembers] = useState([]);

    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const setProfileImage = SignUpStore((state) => state.setProfileImage);
    const setBandMembers = SignUpStore((state) => state.setBandMembers);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({ ...prev, [name]: value }));
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
                    initialImage={signUpData.profileImage}
                />

                <div>
                    <input
                        className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none mt-6"
                        placeholder={`Enter ${signUpData.profileType} name`}
                        type="text"
                        value={signUpData.userName}
                        onChange={handleChange}
                        required
                        name="userName"
                        disabled={useFullName}
                    />
                    {signUpData.profileType === "solo" && (
                        <div className="mt-4">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <span className="text-sm">Use full name instead of a username</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={useFullName}
                                        onChange={(e) => {
                                            setUseFullName(e.target.checked);
                                            setSignUpData((prev) => ({
                                                ...prev,
                                                userName: e.target.checked
                                                    ? `${signUpData.firstName || ''} ${signUpData.lastName || ''}`
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
                        signUpData={signUpData}
                        handleChange={handleChange}
                    />
                </div>

                {signUpData.profileType === "band" && (
                    <BandMembersInput members={members} setMembers={setMembers} />
                )}

                <div>
                    <Bio signUpData={signUpData} setSignUpData={setSignUpData} />
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full border p-2 rounded-2xl cursor-pointer mt-4"
                >
                    CONTINUE
                </button>
            </div>
        </>
    );
}

export default CreateUser;
