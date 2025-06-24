import { create } from "zustand";
import { persist } from "zustand/middleware";

const SignUpStore = create(persist(
  (set) => ({
    signUpData: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profileType: "",
      selectedInstruments: [],
      selectedGenres: [],
      location: "",
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
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          profileType: "",
          selectedInstruments: [],
          selectedGenres: [],
          location: "",
          openings: {
            instruments: [],
            genres: []
          },
          bandMembers: []
        },
      }),
  }),
  {
    name: 'riffn-user-storage', // 🔑 key for localStorage
    partialize: (state) => ({ signUpData: state.signUpData }) // only persist signUpData
  }
));

export default SignUpStore;
