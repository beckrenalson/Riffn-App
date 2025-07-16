import { useState } from "react";

function MusicEmbed() {
    const [url, setUrl] = useState("");
    const [embedHtml, setEmbedHtml] = useState(null);

    const handleEmbed = () => {
        try {
            const parsedUrl = new URL(url);

            if (parsedUrl.hostname.includes("spotify.com")) {
                // Convert to embed URL
                const embedUrl = parsedUrl.href.replace("open.spotify.com", "open.spotify.com/embed");
                setEmbedHtml(
                    <iframe
                        style={{ borderRadius: "12px" }}
                        src={embedUrl}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                );
            } else if (parsedUrl.hostname.includes("soundcloud.com")) {
                // Full SoundCloud URL is used in embed
                const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    parsedUrl.href
                )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`;
                setEmbedHtml(
                    <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={embedUrl}
                    />
                );
            } else {
                setEmbedHtml(<p>Only Spotify and SoundCloud URLs are supported.</p>);
            }
        } catch (error) {
            setEmbedHtml(<p>Invalid URL</p>);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a Spotify or SoundCloud link"
                className="w-full p-2 border rounded mb-2"
            />
            <button
                onClick={handleEmbed}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Load
            </button>
            <div className="mt-4">{embedHtml}</div>
        </div>
    );
}

export default MusicEmbed;
