import SignOut from "./SignOut"
import DeleteUser from "./DeleteUser"
import UserStore from "../../stores/UserStore";
import BackBtn from "../BackBtn";

function Settings() {
    const userData = UserStore((state) => state.userData);

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Navigation */}
            <div className="relative z-10">
                <div className="px-6 py-4">
                    <BackBtn />
                </div>
            </div>

            {/* Header */}
            <div className="relative z-10 px-6 pt-4">
                <h1 className="text-3xl font-bold text-zinc-100 text-center tracking-tight">Settings</h1>
                <p className="text-sm text-zinc-400 text-center mt-2">Manage your account preferences</p>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-4">
                    <SignOut />
                    <DeleteUser userId={userData._id} />
                </div>
            </div>
        </div>
    );
}

export default Settings;