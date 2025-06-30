import BackBtn from "../BackBtn"
import Genre from "./Genre"

function GenreList() {

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center px-4 pt-8">
                <div className="max-w-md text-center mb-10">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        What kind of genres do you play?
                    </h1>
                    <p className="text-sm text-gray-400">
                        Choose genre to explore options and make your selection.
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full max-w-xs">
                    <Genre genre="Rock" />
                    <Genre genre="Pop" />
                    <Genre genre="Electronic" />
                    <Genre genre="Rap" />
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
