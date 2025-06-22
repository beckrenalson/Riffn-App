import { useNavigate } from "react-router-dom"
import { USERS_ENDPOINT } from "../../config/api";

function ProfileList({ header, profiles }) {

    const navigate = useNavigate()

    const handleClick = (user) => {
        const slug = user.userName.toLowerCase().replace(/\s+/g, '-'); // optional slugify
        if (user.profileType === "solo") {
            navigate(`/search/solo/${slug}`, { state: { user } });
        } else {
            navigate(`/search/band/${slug}`, { state: { user } });
        }

    }

    return (
        <div>
            <p>{header}</p>

            <ul className="p-5">
                {profiles.map((user, index) => (
                    <button
                        key={index}
                        className="flex items-center border p-2 rounded-lg w-full mb-5 text-left"
                        onClick={() => handleClick(user)}
                    >
                        <img
                            className="rounded-full w-20 h-20 object-cover"
                            src={typeof user.profileImage === "string"
                                ? `${USERS_ENDPOINT}/${user.profileImage.replace(/\\/g, '/')}`
                                : "/images/profilepicture.png"}
                            alt="Profile"
                        />
                        <div className="pl-4 flex flex-col justify-center">
                            <h1 className="text-xl font-semibold">{user.userName}</h1>
                            <h2 className="text-sm text-gray-600">{user.location}</h2>
                        </div>
                    </button>

                ))}
            </ul>
        </div>
    )
}



export default ProfileList