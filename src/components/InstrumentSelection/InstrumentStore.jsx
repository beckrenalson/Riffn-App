import { create } from "zustand";
import { persist } from "zustand/middleware";

const InstrumentStore = create(persist(
    (set) => ({
        selectedInstruments: [],
        setSelectedInstruments: (instruments) => set({ selectedInstruments: instruments }),
        clearSelectedInstruments: () => set({ selectedInstruments: [] }),

        instrumentList: [], // all available instruments from DB
        setInstrumentList: (list) => set({ instrumentList: list }),
    }),
    {
        name: "selected-instruments-storage",
    }
));

export default InstrumentStore;