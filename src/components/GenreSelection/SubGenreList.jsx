import GenreStore from "../../stores/GenreStore";
import { useEffect } from "react";

function SubGenreList({ genres, onSelectionChange, initialSelections }) {
    const { selectedGenres, setSelectedGenres } = GenreStore();

    useEffect(() => {
        // Only initialize if the store is empty and we have initial selections
        if (selectedGenres.length === 0 && initialSelections && initialSelections.length > 0) {
            setSelectedGenres(initialSelections);
        }
    }, []); // Empty dependency array - only run once on mount

    const toggleSelection = (genreName) => {
        const updatedSelection = selectedGenres.includes(genreName)
            ? selectedGenres.filter((name) => name !== genreName)
            : [...selectedGenres, genreName]

        setSelectedGenres(updatedSelection)
        onSelectionChange(updatedSelection)
    };

    return (
        <div className="space-y-3">
            {genres.map((genre, index) => {
                const isSelected = selectedGenres.includes(genre.name);

                return (
                    <button
                        key={index}
                        onClick={() => toggleSelection(genre.name)}
                        className={`w-full text-center rounded-xl p-4 font-medium text-sm transition-all duration-200 ${isSelected
                                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white border-2 border-violet-500/50 shadow-lg shadow-violet-500/20"
                                : "bg-zinc-800/50 text-zinc-300 border-2 border-zinc-700/50 hover:bg-zinc-800/80 hover:border-zinc-600/50"
                            }`}
                    >
                        {genre.name}
                    </button>
                );
            })}
        </div>
    );
}

export default SubGenreList