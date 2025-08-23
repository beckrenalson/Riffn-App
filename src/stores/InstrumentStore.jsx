import { create } from "zustand";
import { persist } from "zustand/middleware";

// UserStore now only manages the global instrument list
const UserStore = create(
    persist(
        (set) => ({
            instrumentList: [],
            setInstrumentList: (list) => set({ instrumentList: list }),
        }),
        { name: "instrument-list-storage" }
    )
);

export default UserStore;
