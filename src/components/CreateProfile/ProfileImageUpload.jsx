import { useState, useEffect } from "react";
import SignUpStore from "./SignUpStore";

function ProfileImageUpload() {
    const [preview, setPreview] = useState(null);
    const setProfileImage = SignUpStore((state) => state.setProfileImage);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]; // safe check for optional chaining
        if (!file) return;

        // Clean up previous preview URL if any
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setProfileImage(file);
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
