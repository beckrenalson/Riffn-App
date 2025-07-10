import { useState, useEffect } from "react";
import SignUpStore from "./SignUpStore";
import { API_URL } from "../../config/api";

function ProfileImageUpload() {
    const [preview, setPreview] = useState(null);
    const setProfileImage = SignUpStore((state) => state.setProfileImage);

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0]; // safe check for optional chaining
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`${API_URL}/api/uploads`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfileImage(`/uploads/${data.filename}`);
            } else {
                console.error("Upload failed");
            }
        } catch (err) {
            console.error("Error uploading image", err);
        }

        // Clean up previous preview URL if any
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    useEffect(() => {
        return () => {
            // Clean up preview URL on component unmount
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

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
