import { useState } from "react";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import api, { API_URL } from "../../services/api";

const base64urlToUint8Array = (base64urlString) => {
  const base64 = base64urlString.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  const padded = base64 + (pad ? '='.repeat(4 - pad) : '');
  const raw = atob(padded);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
};

const uint8ArrayToBase64url = (uint8Array) =>
  btoa(String.fromCharCode(...uint8Array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

const serializeAssertion = (assertion) => ({
  id: assertion.id,
  rawId: uint8ArrayToBase64url(new Uint8Array(assertion.rawId)),
  response: {
    authenticatorData: uint8ArrayToBase64url(new Uint8Array(assertion.response.authenticatorData)),
    clientDataJSON: uint8ArrayToBase64url(new Uint8Array(assertion.response.clientDataJSON)),
    signature: uint8ArrayToBase64url(new Uint8Array(assertion.response.signature)),
    userHandle: assertion.response.userHandle
      ? uint8ArrayToBase64url(new Uint8Array(assertion.response.userHandle))
      : null,
  },
  type: assertion.type,
});

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passkeyError, setPasskeyError] = useState("");

  const navigate = useNavigate();
  const setUserData = UserStore((state) => state.setUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setPasskeyError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(`/auth/login`, formData);

      if (!res.data.user) {
        setError(res.data.message || "Invalid email or password");
        return;
      }

      setUserData(res.data.user);
      navigate(`/search/${res.data.user.profileType === "solo" ? "band" : "solo"}`);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  const handlePasskeyLogin = async () => {
    setPasskeyError("");
    try {
      const challengeRes = await api.post(`/auth/users/passkey-login-challenge`, {
        email: formData.email,
        requestPasskey: true
      });

      if (challengeRes.status !== 200) {
        throw new Error(challengeRes.data.message || "Failed to get passkey challenge");
      }

      const { tempUserId, challenge } = challengeRes.data;
      const publicKey = {
        challenge: base64urlToUint8Array(challenge),
        allowCredentials: [],
        userVerification: "preferred",
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({ publicKey });
      const serializedAssertion = serializeAssertion(assertion);

      const verifyRes = await api.post(`/auth/users/passkey-login-challenge`, {
        email: formData.email,
        tempUserId,
        passkeyCredential: serializedAssertion,
      });

      if (!verifyRes.data.user) {
        throw new Error(verifyRes.data.message || "Passkey login failed");
      }

      setUserData(verifyRes.data.user);
      navigate(`/search/${verifyRes.data.user.profileType === "solo" ? "band" : "solo"}`);

    } catch (err) {
      console.error("Passkey login error:", err);

      if (err.name === "NotAllowedError") {
        setPasskeyError("Passkey authentication was cancelled or timed out.");
      } else if (err.name === "NotSupportedError") {
        setPasskeyError("Passkeys are not supported on this device/browser.");
      } else {
        setPasskeyError(err.message || "Passkey login failed. Please try again or use password login.");
      }
    }
  };

  const isPasskeySupported = typeof window !== "undefined" && !!window.PublicKeyCredential;

  return (
    <>
      <BackBtn />
      <div className="flex justify-center max-h-screen">
        <div className="p-10 w-full max-w-md">
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
              required
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
              disabled={!formData.email || !formData.password}
              className="w-full border p-2 rounded-xl bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              LOGIN
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handlePasskeyLogin}
            disabled={!formData.email || !isPasskeySupported}
            className="w-full border p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login with Passkey
          </button>
          {passkeyError && <p className="text-red-500 mt-2 text-sm">{passkeyError}</p>}
          {!formData.email && (
            <p className="text-gray-500 mt-2 text-sm">Enter your email first to use passkey login</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;