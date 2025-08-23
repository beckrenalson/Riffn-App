import { create } from "zustand";
import { persist } from "zustand/middleware";

const GenreStore = create(persist(
    (set) => ({
        genreList: [],
        selectedGenres: [],
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
        clearSelectedGenres: () => set({ selectedGenres: [] }),
        setGenreList: (list) => set({ genreList: list }),
    }),
    {
        name: "selected-genres-storage",
    }
));

export default GenreStore;