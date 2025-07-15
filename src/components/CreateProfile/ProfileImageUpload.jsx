import { useState } from "react";
import SignUpStore from "./SignUpStore";
import { API_URL } from "../../config/api";
import imageCompression from "browser-image-compression";

function ProfileImageUpload() {
    const [preview, setPreview] = useState(null);
    const setProfileImage = SignUpStore((state) => state.setProfileImage);

    const handleImageChange = async (e) => {
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
        }
    };

    return (
        <div>
            <label htmlFor="profile-pic" className="cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-500">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            UPLOAD
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
