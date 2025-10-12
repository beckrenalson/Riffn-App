import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackBtn from "../BackBtn"
import SubGenreList from "./SubGenreList"
import UserStore from "../../stores/UserStore";
import api, { SUBGENRES_ENDPOINT } from "../../services/api";
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
        if (from === "edit") {
            UserStore.getState().setIsEditing(true);
            navigate("/profile", { state: { stayEditing: true, selectedGenres } });
        } else {
            setUserData({
                ...userData,
                selectedGenres
            })
            navigate("/signup/confirm");
        }
    }

    useEffect(() => {
        if (genresList.length === 0) {
            const getSubGenres = async () => {
                setLoading(true)
                try {
                    const response = await api.get(`${SUBGENRES_ENDPOINT}/${type}`);
                    const data = response.data;
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
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Navigation */}
            <div className="relative z-10">
                <div className="px-6 py-4">
                    <BackBtn />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-6">

                    {/* Title Section */}
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                            Select Your Genres
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Choose the genres you prefer
                        </p>
                    </div>

                    {/* Genre List Section */}
                    {genresList.length > 0 && (
                        <SubGenreList
                            genres={genresList}
                            onSelectionChange={setSelectedGenres}
                            initialSelections={selectedGenres}
                        />
                    )}

                    {/* Selected Count */}
                    {selectedGenres.length > 0 && (
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 px-4 py-2 rounded-xl text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {selectedGenres.length} genre{selectedGenres.length !== 1 ? 's' : ''} selected
                            </span>
                        </div>
                    )}

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={selectedGenres.length === 0}
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 uppercase tracking-wider text-sm shadow-lg"
                    >
                        Continue
                    </button>

                </div>
            </div>
        </div>
    );
}

export default GenreSelection