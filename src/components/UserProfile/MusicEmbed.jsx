import { useState, useEffect } from "react";
import api, { API_URL } from "../../services/api";
import UserStore from "../../stores/UserStore";

function MultiMusicEmbed({ isEditing, setIsEditing }) {
    const [urlInput, setUrlInput] = useState("");
    const [embeds, setEmbeds] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [processingTracks, setProcessingTracks] = useState(new Set());
    const [uploadingFile, setUploadingFile] = useState(false);
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

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if it's an audio file
        if (!file.type.startsWith('audio/')) {
            setError("Please upload an audio file.");
            return;
        }

        // Check file size (e.g., 50MB limit)
        if (file.size > 50 * 1024 * 1024) {
            setError("File size must be less than 50MB.");
            return;
        }

        setUploadingFile(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append('audio', file);
            formData.append('userId', currentUser?._id);

            const response = await api.post(`${API_URL}/api/tracks/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status && response.status >= 200 && response.status < 300) {
                const saved = response.data;
                setEmbeds((prev) => [...prev, saved]);
            } else {
                throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to upload audio file. Please try again.");
        } finally {
            setUploadingFile(false);
            e.target.value = ''; // Reset file input
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
        <div className="space-y-4">
            {isEditing && (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="Paste Spotify or SoundCloud link"
                            className="flex-1 bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTrack();
                                }
                            }}
                        />
                        <button
                            onClick={handleAddTrack}
                            disabled={!urlInput.trim()}
                            className="px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-xl font-medium text-sm transition-all disabled:cursor-not-allowed"
                        >
                            Add
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileUpload}
                            disabled={uploadingFile}
                            className="hidden"
                            id="audio-upload"
                        />
                        <label
                            htmlFor="audio-upload"
                            className={`flex items-center justify-center gap-2 w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 rounded-xl px-4 py-3 hover:border-violet-500 hover:bg-zinc-800/80 transition-all cursor-pointer ${uploadingFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm font-medium">
                                {uploadingFile ? 'Uploading...' : 'Upload Audio File'}
                            </span>
                        </label>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={() => setError("")}
                        className="ml-2 text-red-300 hover:text-red-200 underline text-sm"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-zinc-400">Loading tracks...</div>
                </div>
            )}

            {!isLoading && (
                <div className="space-y-4">
                    {embeds.length > 0 && (
                        <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
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
                                <div className="overflow-hidden rounded-xl">
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
                                    ) : embed.type === "audio" ? (
                                        <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-xl">
                                            <audio
                                                controls
                                                className="w-full"
                                                style={{ height: '40px' }}
                                            >
                                                <source src={embed.src} type={embed.mimeType || 'audio/mpeg'} />
                                                Your browser does not support the audio element.
                                            </audio>
                                            {embed.fileName && (
                                                <div className="text-xs text-zinc-400 mt-2 truncate">
                                                    {embed.fileName}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center text-zinc-400">
                                            Unsupported embed type: {embed.type}
                                        </div>
                                    )}
                                </div>

                                {isEditing && embed._id && (
                                    <button
                                        onClick={() => deleteTrack(embed._id)}
                                        disabled={isProcessing}
                                        className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg disabled:opacity-50"
                                        aria-label="Delete track"
                                    >
                                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {!isLoading && embeds.length === 0 && (
                <div className="text-center text-zinc-500 py-8 italic text-sm">
                    {isEditing ? "No tracks added yet. Add your first track above!" : "No tracks uploaded"}
                </div>
            )}
        </div>
    );
}

export default MultiMusicEmbed;