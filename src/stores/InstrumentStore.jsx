import { create } from "zustand";
import { persist } from "zustand/middleware";

const InstrumentStore = create(persist(
    (set) => ({
        instrumentList: [],
        selectedInstruments: [],
        setSelectedInstruments: (Instruments) => set({ selectedInstruments: Instruments }),
        clearSelectedInstruments: () => set({ selectedInstruments: [] }),
        setInstrumentList: (list) => set({ instrumentList: list }),
    }),
    {
        name: "selected-instruments-storage",
    }
));

export default InstrumentStore;