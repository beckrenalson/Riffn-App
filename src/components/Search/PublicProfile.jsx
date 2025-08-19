import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackBtn from "../BackBtn";
import NavBar from "../NavBar";
import { API_URL } from '../../config/api';

function PublicProfile() {
    const { state } = useLocation();
    const { userName } = useParams();
    const user = state?.user;
    const [tracks, setTracks] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('none'); // 'none', 'pending', 'connected'
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchTracks() {
            try {
                const response = await fetch(`${API_URL}/api/tracks/${user._id}`);
                const data = await response.json();
                setTracks(data);
            } catch (err) {
                console.error("Failed to fetch tracks", err);
            }
        }

        async function checkConnectionStatus() {
            try {
                // This would check if there's an existing connection request or connection
                // const response = await fetch(`${API_URL}/api/connections/${user._id}`);
                // const data = await response.json();
                // setConnectionStatus(data.status);
            } catch (err) {
                console.error("Failed to check connection status", err);
            }
        }

        fetchTracks();
        checkConnectionStatus();
    }, [user]);

    const handleConnectionRequest = async () => {
        setIsLoading(true);
        try {
            // This would send a connection request to the user
            // const response = await fetch(`${API_URL}/api/connections/request`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ targetUserId: user._id })
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setConnectionStatus('pending');
        } catch (err) {
            console.error("Failed to send connection request", err);
        } finally {
            setIsLoading(false);
        }
    };


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
                    <h1 className="text-2xl font-bold">{user?.userName || userName}</h1>
                    <h2 className="text-gray-600">{user?.location || 'Location not specified'}</h2>

                    {/* Connection Status */}
                    <div className="pt-2">
                        {connectionStatus === 'none' && (
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
                                ) : (
                                    <>
                                        {user?.profileType === 'band' ? 'Request to Join' : 'Invite to Band'}
                                    </>
                                )}
                            </button>
                        )}

                        {connectionStatus === 'pending' && (
                            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                {user?.profileType === 'band' ? 'Join request sent' : 'Invitation sent'}
                            </div>
                        )}

                        {connectionStatus === 'connected' && (
                            <div className="space-y-2">
                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                    Connected
                                </div>
                                {/* Show contact info when connected */}
                                <div className="text-sm text-gray-600 space-y-1">
                                    {user?.phone && <p>Phone: {user.phone}</p>}
                                    {user?.instagram && <p>Instagram: @{user.instagram}</p>}
                                    {user?.email && <p>Email: {user.email}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border p-4 rounded-2xl space-y-2 bg-[#1a1a1a] border-gray-800 hover:border-gray-600 transition">
                    {user?.profileType === "band" && (
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Band members:</p>
                            <p>{user?.bandMembers?.join(', ') || 'Not listed'}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-semibold text-gray-500">
                            {user?.profileType === "band" ? "Instruments needed:" : "Instruments played:"}
                        </p>
                        <p>{user?.selectedInstruments?.join(', ') || 'Not specified'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Preferred genres:</p>
                        <p>{user?.selectedGenres?.join(', ') || 'Not specified'}</p>
                    </div>
                </div>

                <div className="border rounded-2xl p-4 bg-[#1a1a1a] border-gray-800 hover:border-gray-600 transition">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Bio:</p>
                    <p>{user?.bio || "No bio provided."}</p>
                </div>

                <div className="border rounded-2xl p-4 bg-[#1a1a1a] border-gray-800 hover:border-gray-600 transition">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Music:</p>
                    <div className="space-y-6">
                        {tracks.map((track, index) => (
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
                                        height="166"
                                        style={{ borderRadius: "12px" }}
                                        frameBorder="no"
                                        scrolling="no"
                                        allow="autoplay"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            <NavBar />
        </>
    );
}

export default PublicProfile;