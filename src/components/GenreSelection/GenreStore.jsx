import { create } from "zustand";
import { persist } from "zustand/middleware";

const GenreStore = create(persist(
    (set) => ({
        selectedGenres: [],
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
    }),
    {
        name: "selected-genres-storage", // unique key in localStorage
    }
));

export default GenreStore;