import { useLocation, useParams } from 'react-router-dom';
import BackBtn from "../BackBtn"
import NavBar from "../NavBar"

function PublicProfile() {
    const { state } = useLocation()
    const { userName } = useParams()
    const band = state?.band

    return (
        <>
            <BackBtn />
            <div className="p-8">
                <img className="rounded-full w-35" src="/images/profilepicture.png" />

                <div className="flex gap-20">
                    <div>
                        <h1 className="font-bold text-xl">{band?.userName || userName}</h1>
                        <h2>{band?.location || 'Unknown Location'}</h2>
                        <p>{band?.contact || 'No contact listed'}</p>
                    </div>
                    <div>
                        <p>{band?.bandMembers?.join(', ') || 'Band Members'}</p>
                        <p>{band?.openings.genres?.join(', ') || 'Preferred genre'}</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="border rounded h-20">
                        <input placeholder="bio" defaultValue={band?.bio}></input>
                    </div>
                    <div>
                        <a href={band?.link || "#"}>Links</a>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}

export default PublicProfile