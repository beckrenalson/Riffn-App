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
  const [passkeyData, setPasskeyData] = useState(null); // Store passkey data temporarily
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

    // Store passkey data in UserStore for the final signup step
    if (passkeyData) {
      setUserData({ passkeyData });
    }

    navigate("/signup/userselection");
  };

  const handlePasskeyRegister = async () => {
    setIsLoading(true);

    try {
      // Create a temporary user ID for the passkey registration process
      // We'll use the email as a temporary identifier since it's unique
      const tempUserId = btoa(userData.email).replace(/[^a-zA-Z0-9]/g, ''); // Simple base64 encode and clean

      console.log("Using temporary ID for passkey registration:", tempUserId);

      // 1️⃣ Get registration challenge using temporary user data
      const resChallenge = await fetch(`${API_URL}/api/passkeys/passkey-challenge-temp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempUserId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName || `${userData.firstName}${userData.lastName}`.toLowerCase()
        }),
      });

      if (!resChallenge.ok) {
        let errorText;
        try {
          const errorData = await resChallenge.json();
          errorText = errorData.error || errorData.message || 'Unknown error';
        } catch (parseError) {
          errorText = await resChallenge.text();
        }
        alert(`Failed to get passkey challenge: ${errorText}`);
        return;
      }

      const options = await resChallenge.json();
      console.log("Received passkey options");

      // 2️⃣ Validate and convert challenge & user ID
      if (!options.challenge) {
        throw new Error("No challenge received from server");
      }
      if (!options.user?.id) {
        throw new Error("No user ID received from server");
      }

      // Convert challenge & user ID
      options.challenge = base64urlToBuffer(options.challenge);
      options.user.id = base64urlToBuffer(options.user.id);

      // 3️⃣ Call WebAuthn
      console.log("Calling navigator.credentials.create...");
      const credential = await navigator.credentials.create({ publicKey: options });

      if (!credential) {
        throw new Error("Failed to create credential");
      }
      console.log("Credential created successfully");

      // 4️⃣ Serialize the credential for storage
      const serializedCredential = {
        id: credential.id,
        rawId: bufferToBase64url(credential.rawId),
        response: {
          attestationObject: bufferToBase64url(credential.response.attestationObject),
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
        },
        type: credential.type,
      };

      // 5️⃣ Store passkey data temporarily (don't save to server yet)
      setPasskeyData({
        tempUserId,
        challenge: options.challenge, // Store original challenge for later verification
        credential: serializedCredential
      });

      console.log("Passkey created and stored temporarily");
      alert("Passkey created! It will be registered when you complete signup.");

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

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-2">
            <input
              type="text"
              name="firstName"
              value={userData.firstName || ''}
              onChange={handleChange}
              placeholder="First Name"
              className={`w-full pl-4 p-2 border rounded-xl ${fieldErrors.firstName ? "border-red-500" : ""
                }`}
            />
            <span className="text-xs h-4 block text-red-500">
              {fieldErrors.firstName || ""}
            </span>
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="lastName"
              value={userData.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
              className={`w-full pl-4 p-2 border rounded-xl ${fieldErrors.lastName ? "border-red-500" : ""
                }`}
            />
            <span className="text-xs h-4 block text-red-500">
              {fieldErrors.lastName || ""}
            </span>
          </div>

          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-4 p-2 border rounded-xl ${fieldErrors.email ? "border-red-500" : ""
                }`}
            />
            <span className="text-xs h-4 block text-red-500">
              {fieldErrors.email || ""}
            </span>
          </div>

          <div className="mb-2">
            <input
              type="password"
              name="password"
              value={userData.password || ''}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-4 p-2 border rounded-xl ${fieldErrors.password ? "border-red-500" : ""
                }`}
            />
            <span className="text-xs h-4 block text-red-500">
              {fieldErrors.password || ""}
            </span>
          </div>

          <button
            type="submit"
            className="w-full border p-2 rounded-xl bg-black text-white"
          >
            CONTINUE
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {!passkeyData && (
          <button
            onClick={handlePasskeyRegister}
            disabled={isLoading}
            className="w-full border p-2 rounded-xl disabled:opacity-50"
          >
            {isLoading ? "Creating Passkey..." : "Create Passkey (Optional)"}
          </button>
        )}
        {passkeyData && (
          <div className="mt-2">
            <p className="text-green-600">✓ Passkey created!</p>
            <p className="text-sm text-gray-600">Will be registered when you complete signup</p>
          </div>
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