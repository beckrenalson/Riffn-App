import { useState } from "react";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import { API_URL } from "../../config/api"

// Helper: convert base64url to Uint8Array for WebAuthn
const base64urlToUint8Array = (base64urlString) => {
  const base64 = base64urlString.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  const padded = base64 + (pad ? '='.repeat(4 - pad) : '');
  const raw = atob(padded);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
};

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passkeyError, setPasskeyError] = useState("");

  const navigate = useNavigate();
  const setUserData = UserStore((state) => state.setUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // -----------------------------
  // Password login
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      const data = await res.json();
      setUserData(data.user);
      navigate(`/search/${data.user.profileType === "solo" ? "band" : "solo"}`);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  // -----------------------------
  // Passkey login
  // -----------------------------
  const handlePasskeyLogin = async () => {
    setPasskeyError("");
    try {
      // 1️⃣ Request login challenge
      const challengeRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, requestPasskey: true }),
      });

      if (!challengeRes.ok) throw new Error("Failed to get passkey challenge");
      const { challenge, tempUserId, user } = await challengeRes.json();

      // 2️⃣ Prepare WebAuthn options
      const publicKey = {
        challenge: base64urlToUint8Array(challenge),
        allowCredentials: user.passkeyId
          ? [{ type: "public-key", id: base64urlToUint8Array(user.passkeyId) }]
          : [],
        userVerification: "preferred",
      };

      // 3️⃣ Call WebAuthn API
      const assertion = await navigator.credentials.get({ publicKey });

      // 4️⃣ Send assertion to backend for verification
      const verifyRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          tempUserId,
          passkeyCredential: assertion,
        }),
      });

      if (!verifyRes.ok) throw new Error("Passkey login failed");
      const verifiedUser = await verifyRes.json();
      setUserData(verifiedUser.user);

      navigate(`/search/${verifiedUser.user.profileType === "solo" ? "band" : "solo"}`);
    } catch (err) {
      console.error(err);
      setPasskeyError("Passkey login failed. Make sure your device supports it.");
    }
  };

  return (
    <>
      <BackBtn />
      <div className="flex justify-center max-h-screen">
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-4 p-2 border rounded-xl"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-4 p-2 border rounded-xl"
            />
            <button
              type="submit"
              className="w-full border p-2 rounded-xl bg-black text-white"
            >
              LOGIN
            </button>
          </form>

          <button
            onClick={handlePasskeyLogin}
            className="w-full border p-2 rounded-xl mt-2"
          >
            Login with Passkey
          </button>
          {passkeyError && <p className="text-red-500 mt-2">{passkeyError}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
