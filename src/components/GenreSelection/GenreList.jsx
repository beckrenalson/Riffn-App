import BackBtn from "../BackBtn"
import Genre from "./Genre"
import GenreStore from "../../stores/GenreStore";
import UserStore from "../../stores/UserStore";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api, { SUBGENRES_ENDPOINT } from "../../services/api";

function GenreList() {
    const navigate = useNavigate();
    const clearSelectedGenres = GenreStore((state) => state.clearSelectedGenres);
    const setGenreList = GenreStore((state) => state.setGenreList);
    const selectedGenres = GenreStore((state) => state.selectedGenres || []);
    const userData = UserStore((state) => state.userData);
    const setUserData = UserStore((state) => state.setUserData);
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");

    useEffect(() => {
        async function fetchGenres() {
            try {
                const res = await api.get(SUBGENRES_ENDPOINT);
                setGenreList(res.data);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        }

        fetchGenres();
    }, []);

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
                <div className="w-full max-w-2xl space-y-8">

                    {/* Title Section */}
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                            What kind of genres do you play?
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Choose genre to explore options and make your selection.
                        </p>
                    </div>

                    {/* Genre Types */}
                    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
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
                    <div className="w-full max-w-md mx-auto">
                        <button
                            onClick={handleContinue}
                            disabled={selectedGenres.length === 0}
                            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 uppercase tracking-wider text-sm shadow-lg mb-4"
                        >
                            Continue
                        </button>
                    </div>

                    {/* Clear Button */}
                    <div className="w-full max-w-md mx-auto">
                        <button
                            onClick={clearSelectedGenres}
                            className="w-full px-6 py-3 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 active:bg-red-500/30 transition-all"
                        >
                            Clear All Selections
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GenreList