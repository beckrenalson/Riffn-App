import { useNavigate } from "react-router-dom"

function ProfileList({ header, profiles }) {

    const navigate = useNavigate()

    const handleClick = (band) => {
        const slug = band.userName.toLowerCase().replace(/\s+/g, '-'); // optional slugify
        navigate(`/search/${slug}`, { state: { band } });
    }

    return (
        <div>
            <p>{header}</p>

            <ul className="p-5">
                {profiles.map((band, index) => (
                    <button
                        key={index}
                        className='flex items-center border p-2 rounded-lg w-full mb-5'
                        onClick={() => handleClick(band)}
                    >
                        <div>
                            <img
                                className="rounded-full w-20"
                                src="/images/profilepicture.png" />
                        </div>
                        <div>
                            <div className='pl-4'>
                                <h1 className="text-xl">{band.userName}</h1>
                                <h1 className="text-l">{band.location}</h1>
                            </div>
                        </div>
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default ProfileList