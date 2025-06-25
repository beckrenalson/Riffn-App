import { create } from "zustand";
import { persist } from "zustand/middleware";

const SignUpStore = create(
  persist(
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
          genres: [],
        },
        bandMembers: [],
        profileImage: null,
      },

      setProfileImage: (file) =>
        set((state) => ({
          signUpData: {
            ...state.signUpData,
            profileImage: file,
          },
        })),

      setBandMembers: (members) =>
        set((state) => ({
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
              genres: [],
            },
            bandMembers: [],
            profileImage: null,
          },
        }),
    }),
    {
      name: "riffn-user-storage",
      partialize: (state) => ({ signUpData: state.signUpData }),
    }
  )
);

export default SignUpStore;
