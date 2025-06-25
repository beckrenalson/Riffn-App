import { useState } from "react";
import SignUpStore from "./SignUpStore";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";
import SelectLocation from "./SelectLocation";

function CreateUser() {
    const navigate = useNavigate()

    const [useFullName, setUseFullName] = useState(false);
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const setProfileImage = SignUpStore((state) => state.setProfileImage);
    const setBandMembers = SignUpStore((state) => state.setBandMembers)


    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [inputValue, setInputValue] = useState("");
    const [members, setMembers] = useState([]);

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!inputValue.trim()) return;

        const updatedMembers = [...members, inputValue.trim()]
        setMembers(updatedMembers)
        setBandMembers(updatedMembers);
        setInputValue("");
    }

    function handleDelete(memberToRemove) {
        const updatedMembers = members.filter((member) => member !== memberToRemove)
        setMembers(updatedMembers)
        setBandMembers(updatedMembers);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setProfileImage(file)
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ [name]: value });
    };

    const handleContinue = (e) => {
        e.preventDefault()
        setBandMembers(members);
        navigate("/signup/instruments")
    }

    return (
        <>
            <BackBtn />
            <div className="min-h-screen p-4">

                <div>
                    <label htmlFor="profile-pic" className="cursor-pointer">
                        <div className="w-32 h-32 rounded-full overflow-hidden border">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    Upload
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        id="profile-pic"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                <div>
                    <input
                        className="border p-2 w-full mt-4 rounded"
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
                                <span className="text-white">Use full name instead of a username</span>
                            </label>
                        </div>
                    )}
                </div>

                <div>
                    <SelectLocation
                        signUpData={signUpData}
                        handleChange={handleChange}
                    />
                </div>

                {signUpData.profileType === "band" && (
                    <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                            <input
                                className="border p-2 w-full rounded"
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter band member"
                            />
                            <button
                                type="submit"
                                className="border mt-2 px-4 py-1 rounded"
                            >
                                Add band member
                            </button>
                        </form>
                        <ul className="mt-2 space-y-1">
                            {members.map((member) => (
                                <li key={member} className="flex justify-between items-center border p-2 rounded">
                                    {member}
                                    <button
                                        className="border px-2 py-0.5 rounded-full"
                                        onClick={() => handleDelete(member)}
                                    >
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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
