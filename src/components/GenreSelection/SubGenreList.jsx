import GenreStore from "./GenreStore";

function SubGenreList({ genres, onSelectionChange }) {
    const { selectedGenres, setSelectedGenres } = GenreStore();

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
                    className="flex flex-col mt-10 w-full"
                    key={index}
                    onClick={() => toggleSelection(genre.name)}
                >
                    <div className={`cursor-pointer border p-4 rounded-lg w-full transition-colors ${selectedGenres.includes(genre.name)
                        ? "bg-purple-400"
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