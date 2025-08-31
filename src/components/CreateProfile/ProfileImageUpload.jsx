import { useState } from "react";
import UserStore from "../../stores/UserStore";
import { API_URL } from "../../services/api";
import imageCompression from "browser-image-compression";
import { PuffLoader } from "react-spinners";

function ProfileImageUpload() {
    const [preview, setPreview] = useState(null);
    const setProfileImage = UserStore((state) => state.setProfileImage);
    const [loading, setLoading] = useState(false)

    const handleImageChange = async (e) => {
        setLoading(true)
        const file = e.target.files?.[0];
        if (!file) return;

        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append("image", compressedFile);

            const response = await fetch(`${API_URL}/api/uploads`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfileImage(data.url);
                setPreview(data.url); // Use actual uploaded file URL
            } else {
                console.error("Upload failed");
            }
        } catch (err) {
            console.error("Error uploading image", err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <label htmlFor="profile-pic" className="cursor-pointer">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-500">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            UPLOAD
                        </div>
                    )}

                    {loading && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <PuffLoader color="#FFFFFF" size={40} />
                        </div>
                    )}
                </div>
            </label>

            <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
}

export default ProfileImageUpload;
