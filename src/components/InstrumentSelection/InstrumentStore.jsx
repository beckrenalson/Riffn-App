import { create } from 'zustand';

const InstrumentStore = create((set) => ({
    selectedInstruments: [],
    setSelectedInstruments: (instruments) => set({ selectedInstruments: instruments }),
}));

export default InstrumentStore