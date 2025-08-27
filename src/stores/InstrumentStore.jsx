import { create } from "zustand";
import { persist } from "zustand/middleware";
import UserStore from "./UserStore";

const InstrumentStore = create(persist(
    (set) => ({
        instrumentList: [],
        selectedInstruments: [],
        setSelectedInstruments: (instruments) => set({ selectedInstruments: instruments }),
        clearSelectedInstruments: () => {
            set({ selectedInstruments: [] });
            UserStore.getState().setUserData({
                ...UserStore.getState().userData,
                selectedInstruments: [],
            });
        },
        setInstrumentList: (list) => set({ instrumentList: list }),
    }),
    {
        name: "selected-instruments-storage",
    }
));

export default InstrumentStore;