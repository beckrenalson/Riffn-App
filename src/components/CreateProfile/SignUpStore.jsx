import { create } from "zustand";

const SignUpStore = create((set) => ({
    signUpData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileType: "",
        selectedInstruments: "",
        selectedGenres: ""
    },
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
                selectedInstruments: "",
                selectedGenres: ""
            },
        }),
}));

export default SignUpStore;
