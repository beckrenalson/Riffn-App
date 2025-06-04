import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackBtn from "../BackBtn"
import SubGenreList from "./SubGenreList"

function GenreSelection() {

    const [genresList, setGenresList] = useState([])

    let { type } = useParams();

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleSubmit = async () => {
        const finalData = {
            ...location.state,
            selectedGenres: selectedGenres
        }
      
    }


    useEffect(() => {
        console.log("location state", location.state)
        if (genresList.length === 0) {
            const getSubGenres = async () => {
                const response = await fetch(`https://riffn-api.onrender.com/subgenres/${type}`);
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
                    onSelectionChange={setSelectedGenres}
                />}
                <button
                    onClick={handleSubmit}
                    disabled={selectedGenres.length === 0}>
                    SIGN UP
                </button>
            </div>

        </>
    )
}

export default GenreSelection