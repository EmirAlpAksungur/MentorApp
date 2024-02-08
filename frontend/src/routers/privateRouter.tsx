import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Start from "../layout/Main";
import { RootState } from "../store/configureStore";
import FirstLogin from "../pages/firstLogin/Main";

const PrivateRouter: React.FC = () => {
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuth ? (
    <Start>
      <Outlet />
      <FirstLogin />
    </Start>
  ) : (
    <Navigate to="/home" />
  );
};

export default React.memo(PrivateRouter);
