import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

function AppLayout() {
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
