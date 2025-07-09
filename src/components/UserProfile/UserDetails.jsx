function UserDetails({ icon, details }) {
    return (
        <>
            <div className="flex flex-row items-center gap-6 border-b border-gray-500 p-2 w-full">
                <img className="h-8" src={icon} style={{ filter: 'invert(1)' }} />
                <div>{details}</div>
            </div>
        </>
    )
}

export default UserDetails