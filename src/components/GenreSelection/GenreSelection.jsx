import { useEffect, useState } from "react";
import BackBtn from "../BackBtn"
import Continue from "./Continue";
import SubGenreList from "./SubGenreList"
import { useParams } from "react-router";

function GenreSelection() {
    const [genresList, setGenresList] = useState([])

    let { type } = useParams();

    useEffect(() => {
        if (genresList.length === 0) {
            const getSubGenres = async () => {
                const response = await fetch(`http://localhost:3000/subgenres/${type}`);
                const data = await response.json();
                setGenresList(data)
            }
            getSubGenres();
        }
    }, [type])

    return (
        <>
            <BackBtn />
            <div className="flex justify-center mb-24">
                {genresList.length > 0 && <SubGenreList
                    genres={genresList}
                />}
                <Continue />
            </div>

        </>
    )
}

export default GenreSelection