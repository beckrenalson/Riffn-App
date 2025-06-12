function UserHeader({ userName, profileImage }) {

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
                        className="rounded-full w-40"
                        src={`http://localhost:5000/${userData.profileImage.replace(/\\/g, '/')}`} />
                </div>
            </div>
        </>
    )
}

export default UserHeader