import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackBtn from "../BackBtn"
import SubGenreList from "./SubGenreList"
import SignUpStore from "../CreateProfile/SignUpStore";
import { SUBGENRES_ENDPOINT } from "../../config/api";
import Loading from "../Loading";

function GenreSelection() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const [genresList, setGenresList] = useState([])
    let { type } = useParams();
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState(signUpData.selectedGenres || []);
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        setSignUpData({
            ...signUpData,
            selectedGenres
        })
        if (from === "edit") {
            SignUpStore.getState().setIsEditing(true);
            navigate("/profile", { state: { stayEditing: true, selectedGenres } });
        } else {
            navigate("/signup/confirm");
        }
    }


    useEffect(() => {
        if (genresList.length === 0) {
            const getSubGenres = async () => {
                setLoading(true)
                try {
                    const response = await fetch(`${SUBGENRES_ENDPOINT}/${type}`);
                    const data = await response.json();
                    setGenresList(data)
                } finally {
                    setLoading(false)
                }
            }
            getSubGenres();
        }
    }, [type])

    if (loading) {
        return (
            <Loading />
        );
    }

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
                    className="flex items-center fixed bottom-10 w-fit border rounded-2xl p-4 bg-black"
                    onClick={handleContinue}
                    disabled={selectedGenres.length === 0}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default GenreSelection