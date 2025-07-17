import { useNavigate } from "react-router-dom"
import GenreStore from "./GenreStore";
import SignUpStore from "../CreateProfile/SignUpStore";

function Genre({ genre }) {
    const navigate = useNavigate()
    const selectedGenres = GenreStore((state) => state.selectedGenres || []);
    const genreList = GenreStore((state) => state.genreList || []);
    const isEditing = SignUpStore((state) => state.isEditing);

    // Build a lookup map: name → type
    const genreMap = genreList.reduce((acc, g) => {
        acc[g.name] = g.genre;
        return acc;
    }, {});

    // Count how many selected instruments match this type
    const count = selectedGenres.filter(
        (name) => genreMap[name] === genre
    ).length;

    const handleSubmit = () => {
        const url = isEditing
            ? `/signup/genres/${genre}?from=edit`
            : `/signup/genres/${genre}`;
        navigate(url);
    };

    return (
        <>
            <button
                onClick={handleSubmit}
                className="w-full text-white border border-gray-500 rounded-xl p-4 flex justify-between items-center"
            >
                <span className="text-lg font-medium tracking-wide">{genre}</span>
                {count > 0 && (
                    <span className="bg-white text-black text-sm font-semibold px-2 py-1 rounded-full">
                        {count}
                    </span>
                )}
            </button>
        </>
    )
}

export default Genre