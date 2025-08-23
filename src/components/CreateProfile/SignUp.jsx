import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserStore from "../../stores/UserStore";
import { API_URL } from "../../config/api";

// Helper: base64url → Uint8Array
function base64urlToBuffer(base64url) {
  if (!base64url || typeof base64url !== 'string') {
    throw new Error(`Invalid base64url string: ${base64url}`);
  }

  try {
    const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
    const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
    const str = atob(base64);
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) buffer[i] = str.charCodeAt(i);
    return buffer;
  } catch (error) {
    throw new Error(`Failed to decode base64url string "${base64url}": ${error.message}`);
  }
}

// Helper: Uint8Array → base64url
function bufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function SignUp() {
  const navigate = useNavigate();
  const userData = UserStore((state) => state.userData);
  const setUserData = UserStore((state) => state.setUserData);

  const [fieldErrors, setFieldErrors] = useState({});
  const [passkeyRegistered, setPasskeyRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => navigate("/login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!userData.firstName?.trim()) errors.firstName = "First name required";
    if (!userData.lastName?.trim()) errors.lastName = "Last name required";
    if (!userData.email?.trim()) errors.email = "Email required";
    if (!userData.password || userData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    navigate("/signup/userselection");
  };

  const handlePasskeyRegister = async () => {
    setIsLoading(true);

    try {
      let userId = userData._id;

      // 1️⃣ Create user if missing
      if (!userId) {
        console.log("Creating user...");
        const username =
          userData.userName?.trim() ||
          `${userData.firstName}${userData.lastName}`.toLowerCase();

        const resCreate = await fetch(`${API_URL}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
          }),
        });

        if (!resCreate.ok) {
          const text = await resCreate.text();
          console.error("User creation failed:", resCreate.status, text);
          alert("User creation failed. Check your input.");
          return;
        }

        const createdUser = await resCreate.json();
        userId = createdUser._id;
        setUserData({ _id: userId, userName: username });
        console.log("User created with ID:", userId);
      }

      // 2️⃣ Get registration challenge
      console.log("Getting passkey challenge for userId:", userId);
      console.log("Request URL:", `${API_URL}/api/passkeys/passkey-challenge`);
      console.log("Request payload:", { userId });

      const resChallenge = await fetch(`${API_URL}/api/passkeys/passkey-challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      console.log("Challenge response status:", resChallenge.status);
      console.log("Challenge response ok:", resChallenge.ok);

      if (!resChallenge.ok) {
        let errorText;
        let errorData;

        try {
          errorData = await resChallenge.json();
          errorText = errorData.error || errorData.message || 'Unknown error';
        } catch (parseError) {
          errorText = await resChallenge.text();
        }

        console.error("Passkey challenge error:", {
          status: resChallenge.status,
          statusText: resChallenge.statusText,
          error: errorText,
          data: errorData
        });

        alert(`Failed to get passkey challenge: ${errorText}`);
        return;
      }

      const options = await resChallenge.json();
      console.log("Received options:", options);
      console.log("Response headers:", Object.fromEntries(resChallenge.headers.entries()));

      // Debug the exact response structure
      console.log("Options keys:", Object.keys(options));
      console.log("Challenge value:", options.challenge);
      console.log("Challenge type:", typeof options.challenge);

      // 3️⃣ Validate and convert challenge & user ID
      if (!options.challenge) {
        console.error("Full server response:", JSON.stringify(options, null, 2));
        throw new Error("No challenge received from server");
      }
      if (!options.user?.id) {
        throw new Error("No user ID received from server");
      }

      console.log("Original challenge:", options.challenge);
      console.log("Original user ID:", options.user.id);

      // Convert challenge & user ID
      try {
        options.challenge = base64urlToBuffer(options.challenge);
        options.user.id = base64urlToBuffer(options.user.id);
        console.log("Converted challenge and user ID successfully");
      } catch (conversionError) {
        console.error("Conversion error:", conversionError);
        throw new Error(`Failed to convert server response: ${conversionError.message}`);
      }

      // 4️⃣ Call WebAuthn
      console.log("Calling navigator.credentials.create...");
      const credential = await navigator.credentials.create({ publicKey: options });

      if (!credential) {
        throw new Error("Failed to create credential");
      }
      console.log("Credential created successfully");

      // 4.5️⃣ Serialize the credential for transmission
      const serializedCredential = {
        id: credential.id, // This should already be base64url
        rawId: bufferToBase64url(credential.rawId),
        response: {
          attestationObject: bufferToBase64url(credential.response.attestationObject),
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
        },
        type: credential.type,
      };

      console.log("Serialized credential:", {
        id: serializedCredential.id,
        rawIdLength: serializedCredential.rawId.length,
        hasAttestationObject: !!serializedCredential.response.attestationObject,
        hasClientDataJSON: !!serializedCredential.response.clientDataJSON
      });

      // 5️⃣ Send attestation to backend
      console.log("Verifying passkey with server...");
      const resVerify = await fetch(`${API_URL}/api/passkeys/users/${userId}/passkeys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attestationResponse: serializedCredential }),
      });

      if (!resVerify.ok) {
        const text = await resVerify.text();
        console.error("Passkey verification failed:", resVerify.status, text);
        alert("Passkey registration failed.");
        return;
      }

      const result = await resVerify.json();
      console.log("Passkey registered successfully:", result);

      setPasskeyRegistered(true);
      alert("Passkey registered! You can now login with it.");
    } catch (err) {
      console.error("Passkey registration error:", err);
      if (err.name === 'NotSupportedError') {
        alert("Passkeys are not supported on this device or browser.");
      } else if (err.name === 'NotAllowedError') {
        alert("Passkey registration was cancelled or not allowed.");
      } else {
        alert(`Passkey registration failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    UserStore.getState().setIsEditing(false);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-10 max-w-md w-full">
        <h2 className="text-4xl font-bold mb-6 text-center">Riffn</h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full pl-4 p-2 border rounded-xl"
          />
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full pl-4 p-2 border rounded-xl"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full pl-4 p-2 border rounded-xl"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-4 p-2 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full border p-2 rounded-xl bg-black text-white"
          >
            CONTINUE
          </button>
        </form>

        {!passkeyRegistered && (
          <button
            onClick={handlePasskeyRegister}
            disabled={isLoading}
            className="w-full border p-2 rounded-xl mt-2 disabled:opacity-50"
          >
            {isLoading ? "Registering Passkey..." : "Register Passkey (Optional)"}
          </button>
        )}
        {passkeyRegistered && (
          <p className="text-green-600 mt-2">Passkey registered!</p>
        )}

        <p className="mt-6 text-center">
          Already have an account?
          <button onClick={login} className="underline ml-2">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;