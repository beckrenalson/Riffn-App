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
        bandMembers: [],
        profileImage: null,
        bio: ""
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

      isEditing: false,

      setIsEditing: (bool) => set({ isEditing: bool }),

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
            bandMembers: [],
            profileImage: null,
            bio: ""
          },
        }),
    }),
    {
      name: "riffn-user-storage",
      partialize: (state) => ({ signUpData: state.signUpData, isEditing: state.isEditing }),
    }
  )
);

export default SignUpStore;
