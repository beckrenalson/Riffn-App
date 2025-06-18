import { useState } from "react";
import BackBtn from "../BackBtn";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search")
  };

  return (
   <>
   <BackBtn />
    <div className="flex items-center justify-center">
      <div className="">
        <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            LOGIN 
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
