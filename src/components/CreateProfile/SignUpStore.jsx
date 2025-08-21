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

      // Set profile image
      setProfileImage: (file) =>
        set((state) => ({
          signUpData: {
            ...state.signUpData,
            profileImage: file,
          },
        })),

      // Set band members
      setBandMembers: (members) =>
        set((state) => ({
          signUpData: {
            ...state.signUpData,
            bandMembers: members,
          },
        })),

      isEditing: false,
      setIsEditing: (bool) => set({ isEditing: bool }),

      // General updater for signUpData
      setSignUpData: (updater) =>
        set((state) => {
          let updatedData =
            typeof updater === "function" ? updater(state.signUpData) : updater;

          // Flatten accidental `state` wrapper
          if (updatedData.state) updatedData = updatedData.state;

          return {
            signUpData: { ...state.signUpData, ...updatedData },
          };
        }),

      // Reset all signup data
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
