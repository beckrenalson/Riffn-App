import { create } from "zustand";
import { persist } from "zustand/middleware";
import UserStore from "./UserStore";

const GenreStore = create(persist(
    (set) => ({
        genreList: [],
        selectedGenres: [],
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
        clearSelectedGenres: () => {
            set({ selectedGenres: [] });
            UserStore.getState().setUserData({
                ...UserStore.getState().userData,
                selectedGenres: [],
            });
        },
        setGenreList: (list) => set({ genreList: list }),
    }),
    {
        name: "selected-genres-storage",
    }
));

export default GenreStore;