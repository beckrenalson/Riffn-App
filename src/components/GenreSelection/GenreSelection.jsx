import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackBtn from "../BackBtn"
import SubGenreList from "./SubGenreList"
import UserStore from "../../stores/UserStore";
import { SUBGENRES_ENDPOINT } from "../../config/api";
import Loading from "../Loading";

function GenreSelection() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const [genresList, setGenresList] = useState([])
    let { type } = useParams();
    const userData = UserStore((state) => state.userData);
    const setUserData = UserStore((state) => state.setUserData);
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState(userData.selectedGenres || []);
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        setUserData({
            ...userData,
            selectedGenres
        })
        if (from === "edit") {
            UserStore.getState().setIsEditing(true);
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
            <div className="flex flex-col items-center px-4">
                <div className="w-full max-w-2xl mb-10">
                    {genresList.length > 0 && (
                        <SubGenreList
                            genres={genresList}
                            onSelectionChange={setSelectedGenres}
                        />
                    )}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={selectedGenres.length === 0}
                    className={`w-full max-w-md border p-2 rounded-2xl cursor-pointer transition mb-10
            ${selectedGenres.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    Continue
                </button>
            </div>
        </>
    );
}

export default GenreSelection