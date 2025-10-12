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

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-950">
                <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="text-zinc-400">Loading user...</div>
                </div>
            </div>
        );
    }

    const isBandMember = currentUser && user?.profileType === 'band' && user.bandMembers.some(member => member._id === currentUser._id);

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Navigation */}
            <div className="relative z-10">
                <div className="px-6 py-4">
                    <BackBtn />
                </div>
            </div>

            {/* Profile Header */}
            <div className="relative z-10 px-6 pt-4">
                <div className="flex justify-center">
                    <div className="relative">
                        <img
                            className="rounded-full w-32 h-32 object-cover border-4 border-zinc-800/50 shadow-2xl"
                            src={
                                user.profileImage?.startsWith("http")
                                    ? user.profileImage
                                    : user.profileImage
                                        ? `${API_URL}${user.profileImage.startsWith("/") ? user.profileImage : "/" + user.profileImage}`
                                        : "/images/profilepicture.png"
                            }
                            alt="Profile"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-6">

                    {/* User Info & Action Button */}
                    <div className="text-center space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">{user.userName}</h1>
                            <p className="text-zinc-400 mt-2 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {user.location || 'Location not specified'}
                            </p>
                        </div>

                        {connectionStatus === 'none' && currentUser && currentUser._id !== user._id && (
                            (user?.profileType === 'band' && currentUser?.profileType === 'solo') ? (
                                <button
                                    onClick={handleConnectionRequest}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 mx-auto uppercase tracking-wider text-sm shadow-lg"
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
                                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 mx-auto uppercase tracking-wider text-sm shadow-lg"
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
                            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-3 rounded-xl font-medium text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {user?.profileType === 'band' ? 'Join request sent' : 'Invitation sent'}
                            </div>
                        )}

                        {connectionStatus === 'accepted' && (
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl font-medium text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Already Member
                            </div>
                        )}
                    </div>

                    {/* Bio Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                        <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                            Bio
                        </label>
                        <p className="text-zinc-300 whitespace-pre-line leading-relaxed text-sm">
                            {user.bio || <span className="text-zinc-500 italic">No bio provided.</span>}
                        </p>
                    </div>

                    {/* Profile Details */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
                        <div className="px-6 py-4 border-b border-zinc-800/50">
                            <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Profile Details</h3>
                        </div>

                        <div className="divide-y divide-zinc-800/30 p-6 space-y-6">
                            {user?.profileType === "band" && (
                                <div className="pt-2">
                                    <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                                        Band Members
                                    </label>
                                    {user?.bandMembers?.length > 0 ? (
                                        <ProfileList
                                            header=""
                                            profiles={user.bandMembers.filter(member => typeof member === 'object' && member._id)}
                                        />
                                    ) : (
                                        <p className="text-zinc-500 italic text-sm">No members listed</p>
                                    )}
                                </div>
                            )}

                            <div className="pt-6">
                                <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                                    {user.profileType === "band" ? "Instruments Needed" : "Instruments Played"}
                                </label>
                                {user.selectedInstruments && user.selectedInstruments.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {user.selectedInstruments.map((instrument, index) => (
                                            <span
                                                key={index}
                                                className="bg-violet-500/10 border border-violet-500/30 text-violet-300 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                {instrument}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-zinc-500 italic text-sm">Not specified</p>
                                )}
                            </div>

                            <div className="pt-6">
                                <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                                    Preferred Genres
                                </label>
                                {user.selectedGenres && user.selectedGenres.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {user.selectedGenres.map((genre, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-zinc-500 italic text-sm">Not specified</p>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* Contact & Socials */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
                        <div className="px-6 py-4 border-b border-zinc-800/50">
                            <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Contact & Socials</h3>
                        </div>

                        <div className="p-6">
                            {isBandMember || user?.profileType === 'solo' ? (
                                <div className="space-y-3 text-sm">
                                    {user.phone && (
                                        <div className="flex items-center gap-3 text-zinc-300">
                                            <span className="text-zinc-500 font-medium">Phone:</span>
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    {user.email && (
                                        <div className="flex items-center gap-3 text-zinc-300">
                                            <span className="text-zinc-500 font-medium">Email:</span>
                                            <span>{user.email}</span>
                                        </div>
                                    )}
                                    {user.instagram && (
                                        <div className="flex items-center gap-3 text-zinc-300">
                                            <span className="text-zinc-500 font-medium">Instagram:</span>
                                            <span>@{user.instagram}</span>
                                        </div>
                                    )}
                                    {user.socials && Object.keys(user.socials).length > 0 ? (
                                        Object.entries(user.socials).map(([platform, link]) =>
                                            link ? (
                                                <div key={platform} className="flex items-center gap-3 text-zinc-300">
                                                    <span className="text-zinc-500 font-medium">
                                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                                                    </span>
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-violet-400 hover:text-violet-300 transition-colors underline"
                                                    >
                                                        {link}
                                                    </a>
                                                </div>
                                            ) : null
                                        )
                                    ) : !user.phone && !user.email && !user.instagram && (
                                        <p className="text-zinc-500 italic">No contact information provided</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-zinc-500 italic text-sm">You must be part of this band to view contact information.</p>
                            )}
                        </div>
                    </div>

                    {/* Music Section */}
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
                        <div className="px-6 py-4 border-b border-zinc-800/50">
                            <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Music</h3>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {tracks.length > 0 ? (
                                    tracks.map((track, index) => (
                                        <div key={index} className="overflow-hidden rounded-xl">
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
                                    <p className="text-zinc-500 italic text-sm">No tracks uploaded</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
}

export default PublicProfile;