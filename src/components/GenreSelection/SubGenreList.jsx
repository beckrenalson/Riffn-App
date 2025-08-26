import GenreStore from "../../stores/GenreStore";
import { useEffect } from "react";

function SubGenreList({ genres, onSelectionChange, initialSelections }) {
    const { selectedGenres, setSelectedGenres } = GenreStore();

    useEffect(() => {
        if (initialSelections) {
            setSelectedGenres(initialSelections);
        }
    }, [initialSelections, setSelectedGenres]);

    const toggleSelection = (genreName) => {
        const updatedSelection = selectedGenres.includes(genreName)
            ? selectedGenres.filter((name) => name !== genreName)
            : [...selectedGenres, genreName]

        setSelectedGenres(updatedSelection)
        onSelectionChange(updatedSelection)
    };

    return (
        <div className="">
            {genres.map((genre, index) => (
                <button
                    className="flex flex-col mt-6 w-full"
                    key={index}
                    onClick={() => toggleSelection(genre.name)}
                >
                    <div className={`w-full text-white border border-gray-500 rounded-xl p-4 flex justify-center items-center ${selectedGenres.includes(genre.name)
                        ? "bg-gray-800"
                        : "bg-transparent"
                        }`}>
                        <p>{genre.name}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default SubGenreList