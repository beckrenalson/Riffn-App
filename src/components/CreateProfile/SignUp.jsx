import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    navigate("/userselection")
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="">
        <h2 className="text-4xl font-bold mb-6 text-center">Riffn</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full pl-4 p-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full pl-4 p-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full pl-4 p-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-4 p-2 border rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full border p-2 rounded-lg cursor-pointer"
          >
            SIGN UP
          </button>
        </form>
        <p className="mt-6 text-center">Already have an account?
          <NavLink
            to="/login"
            className="underline font-bold"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp
