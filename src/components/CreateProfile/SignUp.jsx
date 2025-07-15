import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpStore from "./SignUpStore";
import { USERS_ENDPOINT } from "../../config/api";

function SignUp() {

  const navigate = useNavigate();

  const signUpData = SignUpStore((state) => state.signUpData)
  const setSignUpData = SignUpStore((state) => state.setSignUpData)

  const [emailError, setEmailError] = useState("")

  const login = () => {
    navigate("/login")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = await checkEmailExists();
    if (exists) return;

    navigate("/signup/userselection")
  };

  const checkEmailExists = async () => {
    if (!signUpData.email) return;

    try {
      const res = await fetch(`${USERS_ENDPOINT}/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signUpData.email }),
      });

      if (res.status === 409) {
        const data = await res.json();
        setEmailError(data.error);
      } else {
        setEmailError("");
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setEmailError("Something went wrong");
      return true;
    }
  };

  useEffect(() => {
    SignUpStore.getState().setIsEditing(false);
  }, []);

  return (
    <>

      <div className="h-screen flex items-center justify-center">
        <div className="">
          <h2 className="text-4xl font-bold mb-6 text-center">Riffn</h2>
          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full pl-4 p-2 border border-gray-500 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full pl-4 p-2 border border-gray-500 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
                onBlur={checkEmailExists}
                required
                placeholder="Email"
                className="w-full pl-4 p-2 border border-gray-500 rounded-lg focus:outline-none"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full pl-4 p-2 border border-gray-500 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!!emailError}
              className="w-full border p-2 rounded-lg cursor-pointer disabled:opacity-50"
            >
              CONTINUE
            </button>
          </form>
          <p className="mt-6 text-center">Already have an account?
            <button onClick={login}
              className="underline font-bold cursor-pointer" style={{ backgroundColor: 'transparent' }}
            >
              Login
            </button>
          </p>
        </div>
      </div>

    </>
  );
}

export default SignUp
