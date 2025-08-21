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
        localStorage.removeItem("riffn-user-storage");
        localStorage.removeItem("selected-instruments-storage");
        localStorage.removeItem("selected-genres-storage");
        UserStore.getState().resetUserData()
        navigate("/")
    };

    const handleCancelSignOut = () => {
        setIsAlertDialogVisible(false);
    };

    return (
        <>
            <button
                onClick={showSignOutConfirmDialog}
                className="border rounded-2xl p-2 cursor-pointer"
            >Sign Out
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