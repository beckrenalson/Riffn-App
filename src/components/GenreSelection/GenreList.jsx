import BackBtn from "../BackBtn"
import Genre from "./Genre"
import GenreStore from "../../stores/GenreStore";
import { useEffect } from "react";
import axios from "axios";
import { SUBGENRES_ENDPOINT } from "../../config/api";

function GenreList() {
    const clearSelectedGenres = GenreStore((state) => state.clearSelectedGenres);
    const setGenreList = GenreStore((state) => state.setGenreList);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const res = await axios.get(SUBGENRES_ENDPOINT);
                setGenreList(res.data); // assumes array of { name, type }
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        }

        fetchGenres();
    }, []);

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center px-4 pt-8 mb-10">
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

                <button
                    onClick={clearSelectedGenres}
                    className="mt-8 px-4 py-3 w-full text-base font-medium text-red-600 bg-red-100 rounded-xl shadow-sm hover:bg-red-200 active:bg-red-300 transition-all"
                >
                    Clear All Selections
                </button>

            </div>
        </>
    )
}

export default GenreList
