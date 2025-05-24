function UserDetails({ icon, details }) {
    return (
        <>
            <div className="flex flex-row items-center w-full gap-6 border-b p-2">
                <img className="h-8" src={icon} />
                <p>{details}</p>
            </div>
        </>
    )
}

export default UserDetails