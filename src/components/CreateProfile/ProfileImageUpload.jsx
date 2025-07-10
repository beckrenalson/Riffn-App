import { useState, useEffect } from "react";

function ProfileImageUpload({ onImageChange, initialImage }) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialImage) {
            setPreview(URL.createObjectURL(initialImage));
        }
    }, [initialImage]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageChange(file);
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
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}

export default ProfileImageUpload;
