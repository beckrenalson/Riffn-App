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
                className="mt-4 bg-red-600 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Delete account permanently"
            >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
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
