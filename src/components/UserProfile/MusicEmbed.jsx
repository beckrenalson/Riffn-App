import { useState, useEffect } from "react";
import api, { API_URL } from "../../services/api";
import UserStore from "../../stores/UserStore";

function MultiMusicEmbed({ isEditing, setIsEditing }) {
    const [urlInput, setUrlInput] = useState("");
    const [embeds, setEmbeds] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [processingTracks, setProcessingTracks] = useState(new Set());
    const currentUser = UserStore((state) => state.userData);

    const saveTrack = async (embed) => {
        try {
            const response = await api.post(`${API_URL}/api/tracks`, embed);
            if (response.status && response.status >= 200 && response.status < 300) {
                const saved = response.data;
                setEmbeds((prev) => [...prev.slice(0, -1), saved]);
            } else {
                throw new Error(`Failed to save track: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error saving track:", error);
            setEmbeds((prev) => prev.slice(0, -1));
            setError("Failed to save track. Please try again.");
        }
    };

    const deleteTrack = async (trackId) => {
        if (processingTracks.has(trackId)) return;

        setProcessingTracks(prev => new Set(prev).add(trackId));
        setError("");

        try {
            const originalEmbeds = [...embeds];
            setEmbeds((prev) => prev.filter((track) => track._id !== trackId));

            const res = await api.delete(`${API_URL}/api/tracks/${trackId}`);

            if (res.status && res.status >= 200 && res.status < 300) {
                // Deletion successful
            } else {
                throw new Error(`Failed to delete track: ${res.status} ${res.statusText}`);
            }

        } catch (err) {
            console.error("Delete failed:", err);
            setEmbeds(originalEmbeds);
            setError("Failed to delete track. Please try again.");
        } finally {
            setProcessingTracks(prev => {
                const newSet = new Set(prev);
                newSet.delete(trackId);
                return newSet;
            });
        }
    };

    const handleAddTrack = () => {
        if (!urlInput.trim()) {
            setError("Please enter a URL.");
            return;
        }

        try {
            const trimmedUrl = urlInput.trim();
            const parsedUrl = new URL(trimmedUrl);
            let embed = null;

            if (parsedUrl.hostname.includes("spotify.com")) {
                const embedUrl = trimmedUrl.replace("open.spotify.com", "open.spotify.com/embed");
                embed = {
                    type: "spotify",
                    src: embedUrl,
                    userId: currentUser?._id,
                };
            } else if (parsedUrl.hostname.includes("soundcloud.com")) {
                const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    parsedUrl.href
                )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`;

                embed = {
                    type: "soundcloud",
                    src: embedUrl,
                    userId: currentUser?._id,
                };
            }

            if (embed) {
                setEmbeds((prev) => [...prev, embed]);
                saveTrack(embed);
                setUrlInput("");
                setError("");
            } else {
                setError("Only Spotify and SoundCloud links are supported.");
            }
        } catch (err) {
            setError("Please enter a valid Spotify or SoundCloud URL.");
        }
    };

    useEffect(() => {
        async function fetchSavedTracks() {
            if (!currentUser?._id) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const res = await api.get(`${API_URL}/api/tracks/${currentUser._id}`);

                if (res.status === 404) {
                    setEmbeds([]);
                    return;
                }

                if (res.status && res.status >= 200 && res.status < 300) {
                    const data = res.data;
                    const tracksArray = Array.isArray(data) ? data : (data?.tracks || []);
                    setEmbeds(tracksArray);
                } else {
                    throw new Error(`HTTP ${res.status}: ${res.statusText || 'Failed to fetch tracks'}`);
                }

            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 404) {
                        setEmbeds([]);
                    } else if (status === 401 || status === 403) {
                        setError("Authentication error: Please log in again.");
                    } else {
                        setError(`Failed to load tracks: HTTP ${status}`);
                    }
                } else if (error.request) {
                    setError("Network error: Could not connect to the server.");
                } else {
                    setError(`Failed to load tracks: ${error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchSavedTracks();
    }, [currentUser?._id]);

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste Spotify or SoundCloud link"
                    className="flex-1 p-2 border border-gray-500 rounded-xl"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTrack();
                        }
                    }}
                />
                <button
                    onClick={handleAddTrack}
                    disabled={!urlInput.trim()}
                    className="px-4 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Add
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                    <button
                        onClick={() => setError("")}
                        className="ml-2 text-red-800 hover:text-red-900 underline text-sm"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading tracks...</div>
                </div>
            )}

            {!isLoading && (
                <div className="space-y-6">
                    {embeds.length > 0 && (
                        <div className="text-sm text-gray-600 mb-2">
                            {embeds.length} track{embeds.length !== 1 ? 's' : ''}
                        </div>
                    )}

                    {embeds.map((embed, idx) => {
                        const isProcessing = processingTracks.has(embed._id);

                        if (!embed || !embed.src || !embed.type) {
                            console.warn('Invalid embed data - missing src or type:', embed);
                            return null;
                        }

                        return (
                            <div key={embed._id || idx} className="relative group">
                                {embed.type === "spotify" ? (
                                    <iframe
                                        style={{ borderRadius: "12px" }}
                                        src={embed.src}
                                        width="100%"
                                        height="80"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        title="Spotify track"
                                    />
                                ) : embed.type === "soundcloud" ? (
                                    <iframe
                                        style={{ borderRadius: "12px" }}
                                        width="100%"
                                        height="80"
                                        scrolling="no"
                                        frameBorder="no"
                                        src={embed.src}
                                        title="SoundCloud track"
                                    />
                                ) : (
                                    <div className="bg-gray-100 p-4 rounded-xl text-center text-gray-600">
                                        Unsupported embed type: {embed.type}
                                    </div>
                                )}

                                {isEditing && embed._id && (
                                    <button
                                        onClick={() => deleteTrack(embed._id)}
                                        disabled={isProcessing}
                                        className="absolute top-2 right-2 bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
                                        aria-label="Delete track"
                                        style={{ opacity: 1 }}
                                    >
                                        <img
                                            className="h-4 w-4"
                                            src="/images/trash.png"
                                            alt="Delete"
                                            style={{ filter: 'invert(1)' }}
                                        />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {!isLoading && embeds.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No tracks added yet. Add your first track above!
                </div>
            )}
        </div>
    );
}

export default MultiMusicEmbed;