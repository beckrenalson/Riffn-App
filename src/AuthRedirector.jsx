import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStore from './stores/UserStore';
import SignUpLayout from './components/CreateProfile/SignUpLayout';

const AuthRedirector = () => {
  const navigate = useNavigate();
  const { userData } = UserStore();

  useEffect(() => {
    if (userData && userData._id) {
      // User is logged in, redirect to profile or dashboard
      const target = userData.profileType === "solo" ? "band" : "solo";
      navigate(`/search/${target}`, {replace: true})
    } else {
      // Not logged in, stay on signup layout
      // No explicit navigation needed here, SignUpLayout will render by default
    }
  }, [userData, navigate]);

  // Render SignUpLayout by default, it will be replaced by navigation if logged in
  return <SignUpLayout />;
};

export default AuthRedirector;
