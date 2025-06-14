import { create } from "zustand";
import { persist } from "zustand/middleware";

const SignUpStore = create(persist(
  (set) => ({
    signUpData: {
      userName: "JamSorcerer",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "1234",
      profileType: "solo",
      selectedInstruments: ["Guitar", "Bass Guitar"],
      selectedGenres: ["Punk Rock", "Classical"],
      openings: {
        instruments: [],
        genres: []
      },
      bandMembers: []
    },
    setProfileImage: (file) => set((state) => ({
      signUpData: {
        ...state.signUpData,
        profileImage: file,
      },
    })),
    setBandMembers: (members) => set((state) => ({
      signUpData: {
        ...state.signUpData,
        bandMembers: members,
      },
    })),
    setSignUpData: (data) =>
      set((state) => ({
        signUpData: { ...state.signUpData, ...data },
      })),
    resetSignUpData: () =>
      set({
        signUpData: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          profileType: "",
          selectedInstruments: [],
          selectedGenres: []
        },
      }),
  }),
  {
    name: 'riffn-user-storage', // 🔑 key for localStorage
    partialize: (state) => ({ signUpData: state.signUpData }) // only persist signUpData
  }
));

export default SignUpStore;
