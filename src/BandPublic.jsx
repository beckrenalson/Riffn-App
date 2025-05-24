import BackBtn from "./components/BackBtn"

function BandPublic() {
    return (
        <>
            <BackBtn />
            <div className="p-8">
                <img className="rounded-full w-35" src="/images/profilepicture.png" />

                <div className="flex gap-20">
                    <div>
                        <h1 className="font-bold text-xl">Band Name</h1>
                        <h2>City</h2>
                        <p>Contact</p>
                    </div>
                    <div>
                        <p>Band Members</p>
                        <p>Preferred genre</p>
                    </div>

                </div>

                <div className="flex flex-col">
                    <div className="border rounded h-20"> 
                        <input placeholder="bio"></input>
                    </div>
                    <div>
                        <a href="www.soundcloud.com">Links</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BandPublic