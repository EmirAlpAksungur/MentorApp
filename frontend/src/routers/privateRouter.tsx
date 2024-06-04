import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Start from "../layout/Main";
import { RootState } from "../store/configureStore";
import FirstLogin from "../pages/firstLogin/Main";
import { checkIsAuth } from "../services/actions/login";
const PrivateRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    isAuth && dispatch(checkIsAuth());
  }, []);

  return isAuth ? (
    <Start>
      <Outlet />
      <FirstLogin />
    </Start>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default React.memo(PrivateRouter);
