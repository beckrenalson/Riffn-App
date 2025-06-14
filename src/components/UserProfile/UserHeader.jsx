import SignUpStore from "../CreateProfile/SignUpStore"

function UserHeader({ userName }) {
    const API_URL = import.meta.env.VITE_RIFFN_API;

    const userData = SignUpStore((state) => state.signUpData);

    return (
        <>
            <div className='flex-col flex items-center'>
                <div>
                    <div className=''>
                        <h1 className="text-4xl p-2">{userName}</h1>
                    </div>
                </div>

                <div>
                    <img
                        src={`${API_URL}/${userData.profileImage.replace(/\\/g, '/')}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            </div>
        </>
    )
}

export default UserHeader