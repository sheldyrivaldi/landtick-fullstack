import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/Contex";

export const PrivateRouteLogin = () => {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [state] = useContext(UserContext);

  if (state.user.role != "user") {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
};

export const PrivateRouteAdmin = () => {
  const [state] = useContext(UserContext);

  if (state.user.role != "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
