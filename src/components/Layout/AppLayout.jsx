import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../NavBar';
import UserStore from '../../stores/UserStore';
import api, { USERS_ENDPOINT } from '../../services/api';

function AppLayout() {
  // 🔄 Refresh user data when window regains focus
  useEffect(() => {
    const handleFocus = async () => {
      const currentUser = UserStore.getState().userData;
      if (currentUser?._id) {
        try {
          const res = await api.get(`${USERS_ENDPOINT}/${currentUser._id}`);
          if (res.status === 200) {
            UserStore.getState().setUserData(res.data);
          }
        } catch (err) {
          console.warn('Failed to refresh user data on focus:', err);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // 🚫 Disable browser scroll restoration globally
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}

export default AppLayout;
