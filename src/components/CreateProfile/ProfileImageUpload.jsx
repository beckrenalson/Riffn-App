import { useState, useEffect } from "react";
import UserStore from "../../stores/UserStore";
import api from "../../services/api";
import imageCompression from "browser-image-compression";
import { PuffLoader } from "react-spinners";

function ProfileImageUpload({ setImage, profileImage }) {
    const [preview, setPreview] = useState(profileImage || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const setProfileImage = UserStore((state) => state.setProfileImage);
    const currentProfileImage = UserStore((state) => state.userData?.profileImage);

    const validateFile = (file) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Please select a valid image file (JPEG, PNG, or WebP).");
        }
        if (file.size > 10 * 1024 * 1024) {
            throw new Error("File size must be less than 10MB.");
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError("");

        try {
            validateFile(file);

            // Show blob instantly
            const blobUrl = URL.createObjectURL(file);
            setPreview(blobUrl);

            // Compress before upload
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 800,
                useWebWorker: true,
                fileType: "image/jpeg",
                initialQuality: 0.8,
            };
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append("image", compressedFile);

            const response = await api.post("/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = response.data;

            // Preload new server image before swapping
            const img = new Image();
            img.src = data.url;
            img.onload = () => {
                setProfileImage(data.url);
                setPreview(data.url);

                // Clean up blob safely after server image is ready
                if (blobUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(blobUrl);
                }
            };
        } catch (err) {
            console.error("Error uploading image:", err);
            setError(err.response?.data?.message || err.message || "Failed to upload image.");
            if (currentProfileImage) {
                setPreview(currentProfileImage);
            }
        } finally {
            setLoading(false);
            e.target.value = "";
        }
    };

    // If prop changes (editing mode re-entry)
    useEffect(() => {
        if (profileImage) {
            setPreview(profileImage);
        }
    }, [profileImage]);

    // Fallback to global state if no prop
    useEffect(() => {
        if (currentProfileImage && !preview) {
            setPreview(currentProfileImage);
        }
    }, [currentProfileImage, preview]);

    return (
        <div className="flex flex-col items-center space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm max-w-md text-center">
                    {error}
                </div>
            )}

            <label htmlFor="profile-pic" className="cursor-pointer group">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-500 hover:border-gray-400 transition-colors">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile preview"
                            className={`w-full h-full object-cover transition-opacity ${loading ? "opacity-70" : "opacity-100"
                                }`}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-xs font-medium">UPLOAD</span>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <PuffLoader color="#FFFFFF" size={40} />
                        </div>
                    )}
                </div>
            </label>

            <input
                id="profile-pic"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={loading}
                className="hidden"
            />
        </div>
    );
}

export default ProfileImageUpload;
