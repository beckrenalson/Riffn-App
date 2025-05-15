function UserHeader({username, profilepicture}) {
    return (
        <>
            <div className='flex-col flex items-center'>
                <div>
                    <div className=''>
                        <h1 className="text-4xl p-2">{username}</h1>
                    </div>
                </div>

                <div>
                    <img
                        className="rounded-full w-40"
                        src={profilepicture} />
                </div>
            </div>
        </>
    )
}

export default UserHeader