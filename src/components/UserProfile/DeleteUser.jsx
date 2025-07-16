import { useNavigate } from "react-router-dom";
import { USERS_ENDPOINT } from "../../config/api";

function DeleteUser({ userId }) {

    const navigate = useNavigate()

    async function deleteAccount() {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            const res = await fetch(`${USERS_ENDPOINT}/${userId}`, { method: 'DELETE', credentials: 'include' });

            if (res.ok) {
                alert('Account deleted successfully');

                navigate('/login');
            } else {
                alert('Failed to delete account');
            }
        } catch (e) {
            alert('An error occurred');
        }
    }
    return (
        <>
            <button
                className="border rounded-3xl p-2 cursor-pointer"
                onClick={deleteAccount}
            >Delete
            </button >
        </>
    )
}

export default DeleteUser


