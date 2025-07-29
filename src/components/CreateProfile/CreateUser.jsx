import { useState } from "react";
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
        setSignUpData({ [name]: value });
    };

    const handleContinue = (e) => {
        e.preventDefault();
        setBandMembers(members);
        navigate("/signup/instruments");
    };

    return (
        <>
            <BackBtn />
            <div className="min-h-screen p-4">
                <ProfileImageUpload
                    onImageChange={setProfileImage}
                    initialImage={signUpData.profileImage}
                />

                <div>
                    <input
                        className="border border-gray-500 p-2 w-full mt-4 rounded"
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
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={useFullName}
                                    onChange={(e) => {
                                        setUseFullName(e.target.checked);
                                        setSignUpData({
                                            userName: e.target.checked
                                                ? `${signUpData.firstName || ''} ${signUpData.lastName || ''}`
                                                : ''
                                        });
                                    }}
                                />
                                <span>Use full name instead of a username</span>
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
                    className="w-full border p-2 rounded-lg cursor-pointer"
                >
                    CONTINUE
                </button>
            </div>
        </>
    );
}

export default CreateUser;
