import BackBtn from "./components/BackBtn"

function UserSelection() {
    return (
        <>
        <BackBtn />
            <div className="flex flex-col justify-center h-screen gap-20">
                <button className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-5">
                        <img
                            className="w-30"
                            src="./src/assets/soloartist.png" />
                    </div>
                    <p className="font-bold">Solo Musician</p>
                </button>
                <button className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-5">
                        <img
                            className="w-30"
                            src="./src/assets/band.png" />
                    </div>
                    <p className="font-bold">Band</p>
                </button>
            </div>
        </>
    )
}

export default UserSelection