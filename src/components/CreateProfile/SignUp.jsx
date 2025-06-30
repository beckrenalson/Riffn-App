import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpStore from "./SignUpStore";


function SignUp() {

  const navigate = useNavigate();

  const signUpData = SignUpStore((state) => state.signUpData)
  const setSignUpData = SignUpStore((state) => state.setSignUpData)

  const login = () => {
    navigate("/login")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup/userselection")
  };

  useEffect(() => {
    SignUpStore.getState().setIsEditing(false);
  }, []);

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
              type="submit"
              className="w-full border p-2 rounded-lg cursor-pointer"
            >
              CONTINUE
            </button>
          </form>
          <p className="mt-6 text-center">Already have an account?
            <button onClick={login}
              className="underline font-bold cursor-pointer" style={{ backgroundColor: 'transparent' }}
            >
              Login
            </button>
          </p>
        </div>
      </div>

    </>
  );
}

export default SignUp
