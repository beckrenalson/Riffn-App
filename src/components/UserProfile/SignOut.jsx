import { useState } from "react";
import { useNavigate } from "react-router-dom"
import UserStore from "../../stores/UserStore";
import AlertDialog from "./AlertDialog";

function SignOut() {

    const navigate = useNavigate()

    const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const showSignOutConfirmDialog = () => {
        setDialogMessage('Are you sure you want to sign out?');
        setIsAlertDialogVisible(true);
    };

    const handleConfirmSignOut = async () => {
        setIsAlertDialogVisible(false);
        localStorage.removeItem("selected-instruments-storage");
        localStorage.removeItem("selected-genres-storage");
        await UserStore.getState().logout(); // Call the logout function
        navigate("/")
    };

    const handleCancelSignOut = () => {
        setIsAlertDialogVisible(false);
    };

    return (
        <>
            <button
                onClick={showSignOutConfirmDialog}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
            </button>

            {isAlertDialogVisible && (
                <AlertDialog
                    message={dialogMessage}
                    onConfirm={handleConfirmSignOut}
                    onCancel={handleCancelSignOut}
                    isVisible={isAlertDialogVisible}
                />
            )}
        </>
    )
}

export default SignOut