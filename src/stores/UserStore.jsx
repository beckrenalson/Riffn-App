import { create } from "zustand";
import { persist } from "zustand/middleware";

const UserStore = create(
  persist(
    (set) => ({
      userData: {
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
          userData: {
            ...state.userData,
            profileImage: file,
          },
        })),

      // Set band members
      setBandMembers: (members) =>
        set((state) => ({
          userData: {
            ...state.userData,
            bandMembers: members,
          },
        })),

      isEditing: false,
      setIsEditing: (bool) => set({ isEditing: bool }),

      // General updater for userData
      setUserData: (updater) =>
        set((state) => {
          let updatedData =
            typeof updater === "function" ? updater(state.userData) : updater;
          return {
            userData: { ...state.userData, ...updatedData },
          };
        }),

      // Reset all signup data
      resetUserData: () =>
        set({
          userData: {
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
      partialize: (state) => ({ userData: state.userData, isEditing: state.isEditing }),
    }
  )
);

export default UserStore;
