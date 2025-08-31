import { useState, useEffect } from "react";
import { API_URL } from "../../services/api";
import UserStore from "../../stores/UserStore";

function MultiMusicEmbed({ isEditing, setIsEditing }) {
    const [urlInput, setUrlInput] = useState("");
    const [embeds, setEmbeds] = useState([]);
    const [error, setError] = useState("");
    const currentUser = UserStore((state) => state.userData);

    const saveTrack = async (embed) => {
        try {
            const response = await fetch(`${API_URL}/api/tracks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(embed),
            });

            if (!response.ok) {
                throw new Error("Failed to save track");
            }

            const saved = await response.json(); // get _id of saved track
            setEmbeds((prev) => [...prev.slice(0, -1), saved]); // replace last added with DB version
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTrack = async (trackId) => {
        try {
            const res = await fetch(`${API_URL}/api/tracks/${trackId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete track");

            setEmbeds((prev) => prev.filter((track) => track._id !== trackId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleAddTrack = () => {
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
                setEmbeds((prev) => [...prev, embed]); // temporarily add
                saveTrack(embed); // then replace with saved
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
            if (!currentUser?._id) return;
            try {
                const res = await fetch(`${API_URL}/api/tracks/${currentUser._id}`);
                const data = await res.json();
                setEmbeds(data);
            } catch (error) {
                console.error("Failed to load saved tracks", error);
            }
        }

        fetchSavedTracks();
    }, [currentUser._id]);

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste Spotify or SoundCloud link"
                    className="flex-1 p-2 border rounded-xl"
                />
                <button
                    onClick={handleAddTrack}
                    className="px-4 py-2 bg-gray-500 text-white rounded-2xl"
                >
                    Add
                </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-6">
                {embeds.map((embed, idx) => (
                    <div key={embed._id || idx} className="relative group">
                        {embed.type === "spotify" ? (
                            <iframe
                                style={{ borderRadius: "12px" }}
                                src={embed.src}
                                width="100%"
                                height="80"
                                frameBorder="0"
                                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        ) : (
                            <iframe
                                style={{ borderRadius: "12px" }}
                                width="100%"
                                height="166"
                                scrolling="no"
                                frameBorder="no"
                                src={embed.src}
                            />
                        )}
                        {isEditing && embed._id && (
                            <button
                                onClick={() => deleteTrack(embed._id)}
                                className="absolute top-1 right-1 bg-red-500 p-1 rounded-lg"
                            >
                                <img
                                    className="h-6"
                                    src="/images/trash.png"
                                    alt="Delete"
                                    style={{ filter: 'invert(1)' }}
                                />
                            </button>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiMusicEmbed;
