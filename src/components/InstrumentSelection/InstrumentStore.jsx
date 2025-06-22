import { create } from "zustand";
import { persist } from "zustand/middleware";

const InstrumentStore = create(persist(
    (set) => ({
        selectedInstruments: [],
        setSelectedInstruments: (instruments) => set({ selectedInstruments: instruments }),
    }),
    {
        name: "selected-instruments-storage", // unique key in localStorage
    }
));

export default InstrumentStore;