import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpStore from "./SignUpStore";
import { API_URL, USERS_ENDPOINT } from "../../config/api";
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

function SignUp() {

  const navigate = useNavigate();

  const signUpData = SignUpStore((state) => state.signUpData)
  const setSignUpData = SignUpStore((state) => state.setSignUpData)

  const [fieldErrors, setFieldErrors] = useState({})

  const registerWithPasskey = async () => {
    const email = signUpData.email;

    try {
      const res = await fetch(`${API_URL}/api/auth/webauthn/register/options`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to get options: ${text}`);
      }

      const opts = await res.json();
      console.log('Registration options received:', opts);

      if (!opts.challenge) {
        throw new Error('Missing challenge in registration options');
      }

      const attResp = await startRegistration(opts);

      const verificationRes = await fetch('/api/auth/webauthn/register/verify', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attestationResponse: attResp, email }),
      });

      const verification = await verificationRes.json();

      if (verification.verified) {
        console.log('Passkey registration successful');
        navigate("/signup/userselection");
      } else {
        console.error('Passkey registration failed');
      }

    } catch (err) {
      console.error('Passkey registration error:', err);
    }
  };


  const login = () => {
    navigate("/login")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = await checkDetailsExist();
    if (exists) return;

    navigate("/signup/userselection")
  };

  const checkDetailsExist = async () => {
    const { firstName, lastName, email, password } = signUpData;

    const errors = {};
    if (!firstName?.trim()) errors.firstName = "First name is required";
    if (!lastName?.trim()) errors.lastName = "Last name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters long";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return true; // block submission early
    }

    try {
      const res = await fetch(`${USERS_ENDPOINT}/check-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Convert array of errors to object like: { email: "msg", password: "msg" }
        const errorMap = {};
        (data.errors || []).forEach(err => {
          errorMap[err.param] = err.msg;
        });

        setFieldErrors(errorMap);
        return true;
      }

      setFieldErrors({});
      return false;

    } catch (err) {
      console.error("Error validating fields:", err);
      setFieldErrors({ global: "Something went wrong. Please try again." });
      return true;
    }
  };

  useEffect(() => {
    SignUpStore.getState().setIsEditing(false);
  }, []);

  return (
    <>

      <div className="h-screen flex items-center justify-center">
        <div className="p-10 max-w-md w-full">
          <h2 className="text-4xl font-bold mb-6 text-center">Riffn</h2>
          <form onSubmit={handleSubmit} method="post" noValidate className="space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none"
              />
              {fieldErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none"
              />
              {fieldErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
                onBlur={checkDetailsExist}
                required
                placeholder="Email"
                className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none"
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
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
                className="w-full pl-4 p-2 border border-gray-500 rounded-xl focus:outline-none"
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full border p-2 rounded-xl cursor-pointer disabled:opacity-50"
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
          {/* <button
            type="button"
            onClick={registerWithPasskey}
            className="w-full mt-4 border p-2 rounded-xl bg-black text-white"
          >
            Register with Passkey
          </button> */}

        </div>
      </div>

    </>
  );
}

export default SignUp
