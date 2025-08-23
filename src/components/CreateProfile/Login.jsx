import { useState } from "react";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passkeyError, setPasskeyError] = useState("");

  const navigate = useNavigate();
  const loginWithPasskey = UserStore((state) => state.loginWithPasskey);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      const data = await res.json();
      UserStore.getState().setUserData(data.user);
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
      // 1. Request login challenge
      const res = await fetch("/api/passkeys/users/passkey-login-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const { options, userId } = await res.json();

      options.challenge = Uint8Array.from(atob(options.challenge), (c) =>
        c.charCodeAt(0)
      );
      options.allowCredentials = options.allowCredentials.map((cred) => ({
        ...cred,
        id: Uint8Array.from(atob(cred.id), (c) => c.charCodeAt(0)),
      }));

      // 2. Call WebAuthn API
      const assertion = await navigator.credentials.get({ publicKey: options });

      // 3. Send to backend for verification
      await loginWithPasskey({ userId, assertionResponse: assertion });

      const user = UserStore.getState().userData;
      navigate(`/search/${user.profileType === "solo" ? "band" : "solo"}`);
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
            <button type="submit" className="w-full border p-2 rounded-xl bg-black text-white">
              LOGIN
            </button>
          </form>

          <button
            onClick={handlePasskeyLogin}
            className="w-full border p-2 rounded-xl mt-2"
          >
            Login with Passkey (Optional)
          </button>
          {passkeyError && <p className="text-red-500 mt-2">{passkeyError}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
