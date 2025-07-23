import SignOut from "./SignOut"
import DeleteUser from "./DeleteUser"
import SignUpStore from "../CreateProfile/SignUpStore";
import BackBtn from "../BackBtn";

function Settings() {
    const userData = SignUpStore((state) => state.signUpData);

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