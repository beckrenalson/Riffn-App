import BackBtn from "../BackBtn"
import NavBar from "../NavBar"
import BandList from "./BandList"

function SearchForBand() {
    return (
        <>
            <BackBtn />
            <div className="flex flex-col gap-10 m-10 mb-24">
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
                <BandList />
            </div>
            <NavBar />
        </>
    )
}

export default SearchForBand