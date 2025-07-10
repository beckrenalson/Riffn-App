import SignUpStore from "../CreateProfile/SignUpStore";
import ProfileImageUpload from "../CreateProfile/ProfileImageUpload";
import { API_URL } from "../../config/api";

function UserHeader({ isEditing }) {
    const userData = SignUpStore((state) => state.signUpData);

    const profileImageSrc =
        typeof userData.profileImage === "string"
            ? `${API_URL}/${userData.profileImage.replace(/\\/g, "/")}`
            : "/images/profilepicture.png";

    return (
        <div className="flex flex-col items-center space-y-2 pb-4">
            {isEditing ? (
                <ProfileImageUpload />
            ) : (
                <img
                    src={profileImageSrc}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                />
            )}

            <div className="text-center">
                <h1 className="text-xl font-semibold">
                    {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-600">@{userData.userName}</p>
            </div>
        </div>
    );
}

export default UserHeader;
