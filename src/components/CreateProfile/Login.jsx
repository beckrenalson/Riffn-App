import { useState } from "react";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import SignUpStore from "../CreateProfile/SignUpStore";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // Store user data in Zustand and/or localStorage
      SignUpStore.getState().setSignUpData(data.user);
      localStorage.setItem("riffn-user-storage", JSON.stringify(data.user));

      if (data.user.profileType === "solo") {
        navigate("/search/band");
      } else {
        navigate("/search/solo")
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <>
      <BackBtn />
      <div className="flex justify-center min-h-screen">
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full pl-4 p-2 border border-gray-500 rounded-2xl focus:outline-none"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-4 p-2 border border-gray-500 rounded-2xl focus:outline-none"
            />
            <button
              type="submit"
              className="w-full border p-2 rounded-2xl cursor-pointer bg-black text-white"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
