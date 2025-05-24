import BackBtn from "../BackBtn"
import Genre from "./Genre"

function GenreList() {
    return (
        <>
            <BackBtn />
            <div className="flex justify-center">
            <div className="flex flex-col gap-10 mt-10 mb-24">
                <Genre genre="Rock" />
                <Genre genre="Pop" />
                <Genre genre="Electronic" />
                <Genre genre="HipHop" />
                <Genre genre="Classical" />
                <Genre genre="Jazz" />
                <Genre genre="Country" />
                <Genre genre="World" />
                <Genre genre="Other" />
            </div>
            </div>
        </>
    )
}

export default GenreList
