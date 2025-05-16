function UserPublic() {
    return (
        <>
            <div className="p-8">
                <img className="rounded-full w-35" src="./src/assets/profilepicture.png" />

                <div className="flex gap-20">
                    <div>
                        <h1 className="font-bold">User Name</h1>
                        <h2>Age</h2>
                        <h2>Location</h2>
                        <p>Contact</p>
                    </div>
                    <div>
                        <p>Intruments played</p>
                        <p>Preferred genre</p>
                    </div>

                </div>

                <div className="flex flex-col gap-20">
                    <div className="border rounded h-20">
                        <input placeholder="bio"></input>
                    </div>
                    <div className="border rounded h-20">
                        <a href="www.soundcloud.com">Links</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPublic