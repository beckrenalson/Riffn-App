import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS_ENDPOINT } from "../../config/api";
import AlertDialog from "./AlertDialog";
import SignUpStore from "../../stores/UserStore";
function DeleteUser({ userId }) {
    const navigate = useNavigate();

    const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const showDeleteConfirmDialog = () => {
        setDialogMessage('Are you sure you want to delete your account permanently? This action cannot be undone.');
        setIsAlertDialogVisible(true);
    };

    const handleConfirmDelete = async () => {
        setIsAlertDialogVisible(false);
        try {
            const res = await fetch(`${USERS_ENDPOINT}/${userId}`, { method: 'DELETE', credentials: 'include' });

            if (res.ok) {
                alert('Account deleted successfully');

                localStorage.removeItem("riffn-user-storage");
                SignUpStore.getState().resetUserData();
                navigate('/');
            } else {
                alert('Failed to delete account. Please try again.');
            }
        } catch (e) {
            alert('An error occurred while deleting your account.');
        }
    };

    const handleCancelDelete = () => {
        setIsAlertDialogVisible(false);
    };

    return (
        <>
            <button
                onClick={showDeleteConfirmDialog}
                className="mt-4 bg-red-600 font-semibold py-3 px-6 rounded-2xl"
            >
                Delete Account
            </button>

            {isAlertDialogVisible && (
                <AlertDialog
                    message={dialogMessage}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    isVisible={isAlertDialogVisible}
                />
            )}
        </>
    );
}

export default DeleteUser;