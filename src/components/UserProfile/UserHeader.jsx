import SignUpStore from "../CreateProfile/SignUpStore"
import { API_URL } from "../../config/api";

function UserHeader({ userName, bandName }) {

    const userData = SignUpStore((state) => state.signUpData);

    return (
        <>
            <div className='flex-col flex items-center'>
                <div>
                    <div>
                        <h1 className="text-4xl p-2">{userName}</h1>
                    </div>
                    {userData.profileType === "solo" && (
                        <div>
                            <h1 className="text-4xl p-2">{bandName}</h1>
                            <p>{userName}</p>
                        </div>
                    )}
                </div>

                <div>
                    <img
                        src={typeof userData.profileImage === "string"
                            ? `${API_URL}/${userData.profileImage.replace(/\\/g, '/')}`
                            : "/images/profilepicture.png"}
                        alt="Profile"
                        className="w-30 h-30 rounded-full object-cover"
                    />
                </div>
            </div>
        </>
    )
}

export default UserHeader