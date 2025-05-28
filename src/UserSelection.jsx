import BackBtn from "./components/BackBtn"
import { NavLink } from "react-router"

function UserSelection() {
    return (
        <>
        <BackBtn />
            <div className="flex flex-col gap-20 mt-20">
                <NavLink to="/instruments" className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/soloartist.png" />
                    </div>
                    <p className="font-bold">Solo Musician</p>
                </NavLink>
                <NavLink to="/selectgenre" className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/band.png" />
                    </div>
                    <p className="font-bold">Band</p>
                </NavLink>
            </div>
        </>
    )
}

export default UserSelection