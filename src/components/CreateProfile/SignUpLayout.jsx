import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserStore from '../../../src/stores/UserStore';

function SignUpLayout() {
  const navigate = useNavigate();
  const { userData, _hasHydrated } = UserStore();

  useEffect(() => {
    if (_hasHydrated && userData && userData._id) {
      const target = userData.profileType === "solo" ? "band" : "solo";
      navigate(`/search/${target}`);
    }
  }, [userData, _hasHydrated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default SignUpLayout;