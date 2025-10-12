import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { USERS_ENDPOINT } from "../../services/api";
import AlertDialog from "./AlertDialog";
import UserStore from "../../stores/UserStore";

function DeleteUser({ userId }) {
    const navigate = useNavigate();

    const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const showDeleteConfirmDialog = () => {
        setDialogMessage('Are you sure you want to delete your account permanently? This action cannot be undone and will remove all your data, including your profile, tracks, and band memberships.');
        setIsAlertDialogVisible(true);
    };

    const handleConfirmDelete = async () => {
        setIsAlertDialogVisible(false);
        setIsDeleting(true);

        try {
            const res = await api.delete(`${USERS_ENDPOINT}/${userId}`);

            if (res.status === 200) {
                // Clear user data and storage
                try {
                    localStorage.removeItem("riffn-user-storage");
                    localStorage.removeItem("selected-instruments-storage");
                    localStorage.removeItem("selected-genres-storage");
                } catch (storageError) {
                    console.warn("Could not clear localStorage:", storageError);
                }

                // Reset user store
                UserStore.getState().resetUserData();

                // Navigate to home page
                navigate('/', { replace: true });

                // Show success message after navigation
                setTimeout(() => {
                    alert('Account deleted successfully');
                }, 100);
            } else {
                const errorMessage = res.data?.message || 'Failed to delete account. Please try again.';
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting your account. Please check your connection and try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setIsAlertDialogVisible(false);
    };

    return (
        <>
            <button
                onClick={showDeleteConfirmDialog}
                disabled={isDeleting}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-label="Delete account permanently"
            >
                {isDeleting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Deleting...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                    </>
                )}
            </button>

            {isAlertDialogVisible && (
                <AlertDialog
                    message={dialogMessage}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    isVisible={isAlertDialogVisible}
                    confirmText="Delete Forever"
                    cancelText="Cancel"
                    confirmButtonClass="bg-red-600 hover:bg-red-700"
                />
            )}
        </>
    );
}

export default DeleteUser;
