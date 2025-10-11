import { useNavigate } from "react-router-dom"
import { API_URL } from "../../services/api";

function ProfileList({ header, profiles }) {
    const navigate = useNavigate()

    const handleClick = (user) => {
        const slugify = (name) =>
            name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') // remove special characters
                .replace(/\s+/g, '-');    // replace spaces with hyphens

        const slug = slugify(user.userName);

        // Default to 'solo' if profileType is missing (most band members are solo artists)
        const profileType = user.profileType || 'solo';

        navigate(
            `/search/${profileType}/${slug}`,
            { state: { user } }
        );
    }

    return (
        <div>
            <p>{header}</p>

            <ul className="p-5 space-y-3">
                {profiles.map((user, index) => (
                    <button
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl w-full border border-gray-600 bg-[#1a1a1a] shadow-sm"
                        onClick={() => handleClick(user)}
                    >
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <img
                                className="rounded-full w-16 h-16 object-cover ring-2 ring-gray-700"
                                src={
                                    user.profileImage?.startsWith("http")
                                        ? user.profileImage
                                        : user.profileImage
                                            ? `${API_URL}${user.profileImage.startsWith("/") ? user.profileImage : "/" + user.profileImage}`
                                            : "/images/profilepicture.png"
                                }
                                alt={`${user.userName}'s profile`}
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0 text-left">
                            <h3 className="text-lg font-semibold text-white truncate">
                                {user.userName}
                            </h3>
                            <p className="text-sm text-gray-400 truncate flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {user.location || 'Location not set'}
                            </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex-shrink-0">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default ProfileList