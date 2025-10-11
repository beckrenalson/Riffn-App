function UserDetails({ icon, children }) {
    return (
        <div className="flex flex-row items-center gap-6 p-2 w-full">
            {icon && (
                <img
                    className="h-6"
                    src={icon}
                    alt=""
                    style={{ filter: 'invert(1)' }}
                />
            )}
            <div className="flex-1">{children}</div>
        </div>
    );
}

export default UserDetails;
