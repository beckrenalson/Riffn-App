import { create } from 'zustand';

const GenreStore = create((set) => ({
    selectedGenres: [],
    setSelectedGenres: (genres) => set({ selectedGenres: genres }),
}));

export default GenreStore