import { useLocation, useParams } from 'react-router-dom';
import BackBtn from "../BackBtn";
import NavBar from "../NavBar";
import API_URL from '../../config/api';

function PublicProfile() {
    const { state } = useLocation();
    const { userName } = useParams();
    const user = state?.user;

    return (
        <>
            <BackBtn />
            <div className="p-6 pt-4 space-y-6">
                <div className="flex justify-center">
                    <img
                        className="rounded-full w-32 h-32 object-cover border shadow"
                        src={
                            typeof user?.profileImage === "string"
                                ? `${API_URL}/${user.profileImage.replace(/\\/g, '/')}`
                                : "/images/profilepicture.png"
                        }
                        alt="Profile"
                    />
                </div>

                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold">{user?.userName || userName}</h1>
                    <h2 className="text-gray-600">{user?.location || 'Unknown Location'}</h2>
                    <p className="text-gray-500">{user?.contact || 'No contact listed'}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow space-y-2">
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Band Members:</p>
                        <p className="text-gray-800">{user?.bandMembers?.join(', ') || 'Not listed'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Preferred Genres:</p>
                        <p className="text-gray-800">{user?.openings?.genres?.join(', ') || 'Not specified'}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border rounded p-4 bg-white shadow">
                        <p className="text-sm text-gray-500 mb-2 font-semibold">Bio:</p>
                        <p>{user?.bio || "No bio provided."}</p>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default PublicProfile;
