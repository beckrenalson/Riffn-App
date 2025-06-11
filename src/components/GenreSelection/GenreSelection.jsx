import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../BackBtn"
import SubGenreList from "./SubGenreList"
import SignUpStore from "../CreateProfile/SignUpStore";

function GenreSelection() {
    const API_URL = import.meta.env.VITE_RIFFN_API;


    const [genresList, setGenresList] = useState([])
    let { type } = useParams();
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleContine = async () => {
        setSignUpData({
            ...signUpData,
            selectedGenres
        })
        navigate("/signup/confirm")
    }


    useEffect(() => {
        console.log(signUpData)
        if (genresList.length === 0) {
            const getSubGenres = async () => {
                const response = await fetch(`${API_URL}/subgenres/${type}`);
                const data = await response.json();
                setGenresList(data)
            }
            getSubGenres();
        }
    }, [type])

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center">
                <div className="flex justify-center mb-24">
                    {genresList.length > 0 && <SubGenreList
                        genres={genresList}
                        onSelectionChange={setSelectedGenres}
                    />}

                </div>
                <button
                    className="flex items-center fixed bottom-10 w-fit border p-2 bg-white"
                    onClick={handleContine}
                    disabled={selectedGenres.length === 0}>
                    SIGN UP
                </button>
            </div>
        </>
    )
}

export default GenreSelection