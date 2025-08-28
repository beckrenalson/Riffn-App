import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserStore from '../../../src/stores/UserStore';

function SignUpLayout() {
  const navigate = useNavigate();
  const { userData, _hasHydrated, isEditing } = UserStore();

  useEffect(() => {
    if (_hasHydrated && userData && userData._id && !isEditing) {
      const target = userData.profileType === "solo" ? "band" : "solo";
      navigate(`/search/${target}`);
    }
  }, [userData, _hasHydrated, navigate, isEditing]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default SignUpLayout;