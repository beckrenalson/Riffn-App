import SignUpStore from "../CreateProfile/SignUpStore"

function UserHeader({ userName, profileImage }) {
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
                        src={`http://localhost:5000/${userData.profileImage.replace(/\\/g, '/')}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            </div>
        </>
    )
}

export default UserHeader