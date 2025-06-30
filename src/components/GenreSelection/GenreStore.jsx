import { create } from "zustand";
import { persist } from "zustand/middleware";

const GenreStore = create(persist(
    (set) => ({
        selectedGenres: [],
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
        clearSelectedGenres: () => set({ selectedGenres: [] }),
    }),
    {
        name: "selected-genres-storage",
    }
));

export default GenreStore;