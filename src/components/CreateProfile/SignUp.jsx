import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserStore from "../../stores/UserStore";
import api, { USERS_ENDPOINT, API_URL } from "../../services/api";
import axios from "axios";

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
  const [passkeyData, setPasskeyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => navigate("/login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

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

    try {
      const res = await axios.post(`${API_URL}/api/users/check-details`, {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
      });

      if (res.data.available) {
        if (passkeyData) setUserData((prev) => ({ ...prev, passkeyData }));
        navigate("/signup/userselection");
      }
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409 && err.response.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach((error) => {
          newErrors[error.param] = error.msg;
        });
        setFieldErrors(newErrors);
      } else if (err.response?.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach((error) => {
          newErrors[error.param] = error.msg;
        });
        setFieldErrors(newErrors);
      } else {
        alert(err.response?.data?.message || err.message || "Failed to check details. Try again.");
      }
    }
  };

  const handlePasskeyRegister = async () => {
    setIsLoading(true);

    try {
      const tempUserId = btoa(userData.email).replace(/[^a-zA-Z0-9]/g, '');

      const resChallenge = await api.post(`/auth/passkey-challenge-temp`, {
        tempUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName || `${userData.firstName}${userData.lastName}`.toLowerCase()
      });

      if (resChallenge.status !== 200) {
        let errorText;
        try {
          const errorData = resChallenge.data;
          errorText = errorData.error || errorData.message || 'Unknown error';
        } catch (parseError) {
          errorText = JSON.stringify(resChallenge.data);
        }
        alert(`Failed to get passkey challenge: ${errorText}`);
        return;
      }

      const options = resChallenge.data;

      if (!options.challenge) {
        throw new Error("No challenge received from server");
      }
      if (!options.user?.id) {
        throw new Error("No user ID received from server");
      }

      options.challenge = base64urlToBuffer(options.challenge);
      options.user.id = base64urlToBuffer(options.user.id);

      const credential = await navigator.credentials.create({ publicKey: options });

      if (!credential) {
        throw new Error("Failed to create credential");
      }

      const serializedCredential = {
        id: credential.id,
        rawId: bufferToBase64url(credential.rawId),
        response: {
          attestationObject: bufferToBase64url(credential.response.attestationObject),
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
        },
        type: credential.type,
      };

      setPasskeyData({
        tempUserId,
        challenge: options.challenge,
        credential: serializedCredential
      });

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
            <b>Login</b>
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;