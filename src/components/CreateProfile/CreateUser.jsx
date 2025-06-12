import { useState } from "react";
import SignUpStore from "./SignUpStore";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const navigate = useNavigate()

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

        const newMember = {
            id: Date.now(),
            text: inputValue,
        }

        setMembers([...members, newMember]);
        setInputValue("");
    }

    function handleDelete(memberId) {
        const updatedmembers = members.filter((member) => memberId !== member.id)

        setMembers(updatedmembers);
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
            <div className="p-4">
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
                    />
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="border p-2 w-full mt-4 rounded"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter band member"
                        />
                        <button
                            type="submit"
                            className="border"
                        >Add band member
                        </button>
                    </form>
                    <ul>
                        {members.map((member) => (
                            <li
                                key={member.id}
                            >

                                {member.text}
                                <button
                                    className="border rounded-full"
                                    onClick={() => { handleDelete(member.id) }}
                                >x
                                </button>
                            </li>
                        ))}
                    </ul>
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
