import { NavLink } from "react-router-dom"

function ProfileList() {
    return (
        <>
            <NavLink to="/search" className='flex-row flex items-center border p-2 rounded-lg'>
                <div>
                    <img
                        className="rounded-full w-20"
                        src="/images/profilepicture.png" />
                </div>
                <div>
                    <div className='pl-4'>
                        <h1 className="text-xl">Solo / Band name</h1>
                        <h1 className="text-l">City</h1>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default ProfileList