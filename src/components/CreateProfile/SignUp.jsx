import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {

  const navigate = useNavigate();

  const [signUpData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup/userselection", { state: signUpData })
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="">
          <h2 className="text-4xl font-bold mb-6 text-center">Riffn</h2>
          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={signUpData.firstName}
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
                value={signUpData.lastName}
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
                value={signUpData.email}
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
                value={signUpData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full pl-4 p-2 border rounded-lg focus:outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full border p-2 rounded-lg cursor-pointer"
            >
              CONTINUE
            </button>
          </form>
          <p className="mt-6 text-center">Already have an account?
            {/* <button onClick={navigate("/login")}
              className="underline font-bold"
            >
              Login
            </button> */}
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp
