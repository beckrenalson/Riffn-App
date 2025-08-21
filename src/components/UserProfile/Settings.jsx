import SignOut from "./SignOut"
import DeleteUser from "./DeleteUser"
import UserStore from "../../stores/UserStore";
import BackBtn from "../BackBtn";

function Settings() {
    const userData = UserStore((state) => state.userData);

    return (
        <>
            <BackBtn />
            <div className="flex flex-col m-10">
                <SignOut />

                <DeleteUser userId={userData._id} />
            </div>
        </>
    );
}

export default Settings;