import { useState } from "react";

function GenreList({ genres }) {
    const [selectedGenre, setSelectedGenre] = useState([]);

    const toggleSelection = (index) => {
        setSelectedGenre((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    return (
        <div className="">
            {genres.map((genre, index) => (
                <button
                    className="flex flex-col mt-10 w-full"
                    key={index}
                    onClick={() => toggleSelection(index)}
                >
                    <div className={`cursor-pointer border p-4 rounded-lg w-full transition-colors ${selectedGenre.includes(index)
                        ? "bg-blue-400"
                        : "bg-transparent"
                        }`}>
                        <p>{genre.name}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default GenreList;