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

        fetchTracks();
    }, [user]);


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

                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold">{user?.userName || userName}</h1>
                    <h2 className="text-gray-600">{user?.location || 'Unknown Location'}</h2>
                    <p className="text-gray-500">{user?.contact || 'No contact listed'}</p>
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
