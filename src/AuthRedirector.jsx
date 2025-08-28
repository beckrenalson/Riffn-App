import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStore from './stores/UserStore';
// import SignUpLayout from './components/CreateProfile/SignUpLayout'; // No longer needed directly here

const AuthRedirector = ({ children }) => {
  const navigate = useNavigate();
  const { userData } = UserStore();

  useEffect(() => {
    if (!userData || !userData._id) {
      // Not logged in, redirect to the initial signup path
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);

  // If user data exists, render the children (authenticated content)
  if (userData && userData._id) {
    return children;
  }

  // Otherwise, return null or a loading spinner while redirecting
  return null;
};

export default AuthRedirector;
