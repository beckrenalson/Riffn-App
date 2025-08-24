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

// Helper: convert Uint8Array to base64url for sending to backend
const uint8ArrayToBase64url = (uint8Array) => {
  const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Helper: convert WebAuthn assertion to JSON-serializable format
const serializeAssertion = (assertion) => {
  return {
    id: assertion.id,
    rawId: uint8ArrayToBase64url(new Uint8Array(assertion.rawId)),
    response: {
      authenticatorData: uint8ArrayToBase64url(new Uint8Array(assertion.response.authenticatorData)),
      clientDataJSON: uint8ArrayToBase64url(new Uint8Array(assertion.response.clientDataJSON)),
      signature: uint8ArrayToBase64url(new Uint8Array(assertion.response.signature)),
      userHandle: assertion.response.userHandle ? uint8ArrayToBase64url(new Uint8Array(assertion.response.userHandle)) : null,
    },
    type: assertion.type,
  };
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
  // Password login (uses original endpoint)
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
  // Passkey login (updated for unified endpoint)
  // -----------------------------
  const handlePasskeyLogin = async () => {
    setPasskeyError("");
    try {
      console.log("=== FRONTEND PASSKEY LOGIN START ===");
      console.log("Email:", formData.email);

      // 1️⃣ Request passkey challenge (updated request format)
      console.log("Step 1: Requesting passkey challenge...");
      const challengeRes = await fetch(`${API_URL}/api/auth/users/passkey-login-challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          requestPasskey: true  // This is the key addition!
        }),
      });

      if (!challengeRes.ok) {
        const errorData = await challengeRes.json();
        throw new Error(errorData.message || "Failed to get passkey challenge");
      }

      const { tempUserId, challenge, userName } = await challengeRes.json();
      console.log("Step 1 SUCCESS - received challenge, tempUserId:", tempUserId);

      // 2️⃣ Prepare WebAuthn options
      console.log("Step 2: Preparing WebAuthn options...");
      const publicKey = {
        challenge: base64urlToUint8Array(challenge),
        allowCredentials: [], // Let the authenticator find available credentials
        userVerification: "preferred",
        timeout: 60000,
      };
      console.log("Step 2 SUCCESS - publicKey ready");

      // 3️⃣ Call WebAuthn API
      console.log("Step 3: Calling navigator.credentials.get...");
      const assertion = await navigator.credentials.get({ publicKey });
      console.log("Step 3 SUCCESS - got assertion");

      // 4️⃣ Serialize assertion
      console.log("Step 4: Serializing assertion...");
      const serializedAssertion = serializeAssertion(assertion);
      console.log("Step 4 SUCCESS - serialized");

      // 5️⃣ Send assertion back to unified endpoint for verification
      console.log("Step 5: Sending credential to backend for verification...");
      const verifyRes = await fetch(`${API_URL}/api/auth/users/passkey-login-challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          tempUserId: tempUserId,
          passkeyCredential: serializedAssertion,
        }),
      });

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Passkey login failed");
      }

      const verifiedUser = await verifyRes.json();
      console.log("Step 5 SUCCESS - login complete");

      setUserData(verifiedUser.user);
      navigate(`/search/${verifiedUser.user.profileType === "solo" ? "band" : "solo"}`);

    } catch (err) {
      console.error("=== PASSKEY LOGIN ERROR ===", err);

      if (err.name === "NotAllowedError") {
        setPasskeyError("Passkey authentication was cancelled or timed out.");
      } else if (err.name === "NotSupportedError") {
        setPasskeyError("Passkeys are not supported on this device/browser.");
      } else {
        setPasskeyError(err.message || "Passkey login failed. Please try again or use password login.");
      }
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
              className="w-full border p-2 rounded-xl bg-black text-white"
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
            disabled={!formData.email} // Require email for passkey login
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