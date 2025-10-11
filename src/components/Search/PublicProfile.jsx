import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BackBtn from "../BackBtn";
import api, { USERS_ENDPOINT, API_URL } from '../../services/api';
import UserStore from "../../stores/UserStore";
import ProfileList from "../../components/Search/ProfileList";

function PublicProfile() {
    const { userName } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const currentUser = UserStore((state) => state.userData);

    const [user, setUser] = useState(state?.user || null);
    const [tracks, setTracks] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('none');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) return;

        async function fetchUser() {
            try {
                const res = await api.get(`${USERS_ENDPOINT}/${userName}`);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUser();
    }, [user, userName]);

    useEffect(() => {
        if (!user) return;

        async function fetchTracks() {
            try {
                const res = await api.get(`/tracks/${user._id}`);
                setTracks(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchTracks();
    }, [user]);

    useEffect(() => {
        if (!user || !currentUser || currentUser._id === user._id) {
            return;
        }

        async function checkConnectionStatus() {
            try {
                let res;
                if (user.profileType === 'band') {
                    res = await api.get(`/connections/status?fromUserId=${currentUser._id}&toBandId=${user._id}`);
                } else {
                    res = await api.get(`/connections/status?fromUserId=${currentUser._id}&toSoloId=${user._id}`);
                }
                setConnectionStatus(res.data.status);
            } catch (err) {
                console.error("Error fetching connection status:", err);
                setConnectionStatus('none');
            }
        }

        checkConnectionStatus();
    }, [user, currentUser]);

    const handleConnectionRequest = async () => {
        if (!currentUser) return alert("You must be logged in to request to join.");

        setIsLoading(true);
        try {
            const body = { fromUserId: currentUser._id };
            if (user.profileType === 'band') body.toBandId = user._id;
            if (user.profileType === 'solo') body.toSoloId = user._id;

            const res = await api.post(`/connections/request`, body);

            if (!res.status === 200) return alert(res.data.message);

            setConnectionStatus('pending');
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return <div className="p-6">Loading user...</div>;

    const isBandMember = currentUser && user?.profileType === 'band' && user.bandMembers.some(member => member._id === currentUser._id);

    return (
        <>
            <BackBtn />
            <div className="p-6 pt-4 space-y-6 pb-24">
                <div className="flex justify-center">
                    <img
                        className="rounded-full w-32 h-32 object-cover border"
                        src={
                            user.profileImage?.startsWith("http")
                                ? user.profileImage
                                : user.profileImage
                                    ? `${API_URL}${user.profileImage.startsWith("/") ? user.profileImage : "/" + user.profileImage}`
                                    : "/images/profilepicture.png"
                        }
                        alt="Profile"
                    />
                </div>

                <div className="text-center space-y-3">
                    <h1 className="text-2xl font-bold">{user.userName}</h1>
                    <h2 className="text-gray-600">{user.location || 'Location not specified'}</h2>

                    {connectionStatus === 'none' && currentUser && currentUser._id !== user._id && (
                        (user?.profileType === 'band' && currentUser?.profileType === 'solo') ? (
                            <button
                                onClick={handleConnectionRequest}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : ('Request to Join')}
                            </button>
                        ) :
                            (user?.profileType === 'solo' && currentUser?.profileType === 'band' && currentUser.bandMembers && !currentUser.bandMembers.some(member => member._id === user._id)) ? (
                                <button
                                    onClick={handleConnectionRequest}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : ('Invite to Band')}
                                </button>
                            ) : null
                    )}

                    {connectionStatus === 'pending' && (
                        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2">
                            {user?.profileType === 'band' ? 'Join request sent' : 'Invitation sent'}
                        </div>
                    )}

                    {connectionStatus === 'accepted' && (
                        <div className="space-y-2">
                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                Already Member
                            </div>
                        </div>
                    )}
                </div>

                <div className="border rounded-2xl p-4 bg-[#1a1a1a] border-gray-800">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Bio:</p>
                    <p>{user.bio || "No bio provided."}</p>
                </div>

                <div className="border p-4 rounded-2xl space-y-2 bg-[#1a1a1a] border-gray-800">
                    {user?.profileType === "band" && (
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-3">Band members:</p>
                            {user?.bandMembers?.length > 0 ? (
                                <ProfileList
                                    header=""
                                    profiles={user.bandMembers.filter(member => typeof member === 'object' && member._id)}
                                />
                            ) : (
                                <p className="text-gray-400">No members listed</p>
                            )}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-semibold text-gray-500">
                            {user.profileType === "band" ? "Instruments needed:" : "Instruments played:"}
                        </p>
                        <p>
                            {user.selectedInstruments && user.selectedInstruments.length > 0
                                ? user.selectedInstruments.join(', ')
                                : 'Not specified'
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Preferred genres:</p>
                        <p>
                            {user.selectedGenres && user.selectedGenres.length > 0
                                ? user.selectedGenres.join(', ')
                                : 'Not specified'
                            }
                        </p>
                    </div>
                </div>

                <div className="border rounded-2xl p-4 bg-[#1a1a1a] border-gray-800">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Contact / Socials:</p>
                    {isBandMember || user?.profileType === 'solo' ? (
                        <div className="text-sm text-gray-600 space-y-1">
                            {user.phone && <p>Phone: {user.phone}</p>}
                            {user.socials && Object.keys(user.socials).length > 0 ? (
                                Object.entries(user.socials).map(([platform, link]) =>
                                    link ? (
                                        <p key={platform}>
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}:{" "}
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400"
                                            >
                                                {link}
                                            </a>
                                        </p>
                                    ) : null
                                )
                            ) : (
                                <p className="text-gray-400">No social links provided</p>
                            )}
                            {user.instagram && <p>Instagram: @{user.instagram}</p>}
                            {user.email && <p>Email: {user.email}</p>}
                        </div>
                    ) : (
                        <p className="text-gray-400">You must be part of this band to contact.</p>
                    )}
                </div>

                <div className="border rounded-2xl p-4 bg-[#1a1a1a] border-gray-800">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Music:</p>
                    <div className="space-y-6">
                        {tracks.length > 0 ? (
                            tracks.map((track, index) => (
                                <div key={index}>
                                    {track.type === "spotify" ? (
                                        <iframe
                                            src={track.src}
                                            width="100%"
                                            height="80"
                                            style={{ borderRadius: "12px" }}
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <iframe
                                            src={track.src}
                                            width="100%"
                                            height="80"
                                            style={{ borderRadius: "12px" }}
                                            frameBorder="no"
                                            scrolling="no"
                                            allow="autoplay"
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No tracks uploaded</p>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}

export default PublicProfile;