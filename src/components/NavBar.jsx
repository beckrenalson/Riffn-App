function NavBar() {
    return (
        <>
            <nav className="flex justify-between">
                <button to="/" end className="w-10">
                    <img src="./src/assets/search.png" />
                </button>
                 <button to="/" end className="w-10">
                    <img src="./src/assets/circle-user.png" />
                </button>
            </nav>
        </>
    )
}

export default NavBar