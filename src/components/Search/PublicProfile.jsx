import { useLocation, useParams } from 'react-router-dom';
import BackBtn from "../BackBtn"
import NavBar from "../NavBar"
import API_URL from '../../config/api';

function PublicProfile() {
    const { state } = useLocation()
    const { userName } = useParams()
    const user = state?.user

    return (
        <>
            <BackBtn />
            <div className="p-8">
                <img
                    className="rounded-full w-35 h-35"
                    src={typeof user.profileImage === "string"
                        ? `${API_URL}/${user.profileImage.replace(/\\/g, '/')}`
                        : "/images/profilepicture.png"} />

                <div className="flex gap-20">
                    <div>
                        <h1 className="font-bold text-xl">{user?.userName || userName}</h1>
                        <h2>{user?.location || 'Unknown Location'}</h2>
                        <p>{user?.contact || 'No contact listed'}</p>
                    </div>
                    <div>
                        <p>{user?.userMembers?.join(', ') || 'Band Members'}</p>
                        <p>{user?.openings.genres?.join(', ') || 'Preferred genre'}</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="border rounded h-20">
                        <input placeholder="bio" defaultValue={user?.bio}></input>
                    </div>
                    <div>
                        <a href={user?.link || "#"}>Links</a>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}

export default PublicProfile