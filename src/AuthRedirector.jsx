import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStore from './stores/UserStore';
// import SignUpLayout from './components/CreateProfile/SignUpLayout'; // No longer needed directly here

const AuthRedirector = ({ children }) => {
  const navigate = useNavigate();
  const { userData, _hasHydrated } = UserStore();

  useEffect(() => {
    if (!_hasHydrated) {
      return; // Wait for the store to rehydrate
    }

    if (!userData || !userData._id) {
      // Not logged in, redirect to the initial signup path
      navigate('/', { replace: true });
    }
  }, [userData, navigate, _hasHydrated]);

  // Render nothing or a loading spinner until hydration is complete
  if (!_hasHydrated) {
    return null; // Or a loading spinner component
  }

  // If user data exists, render the children (authenticated content)
  if (userData && userData._id) {
    return children;
  }

  // Otherwise, return null or a loading spinner while redirecting
  return null;
};

export default AuthRedirector;
