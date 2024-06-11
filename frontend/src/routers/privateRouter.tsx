import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Start from "../layout/Main";
import { RootState } from "../store/configureStore";
import { checkIsAuth, addToken, loadUser } from "../services/actions/login";
import LoadingComp from "../components/loading/LoadingComp";
const PrivateRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const asyncHelper = async () => {
    token &&
      (await dispatch(checkIsAuth(token))) &&
      (await dispatch(addToken(token))) &&
      dispatch(loadUser(token));
  };

  useEffect(() => {
    asyncHelper();
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [isAuth]);
  return isAuth ? (
    <Start>
      <Outlet />
    </Start>
  ) : token ? (
    <LoadingComp />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default React.memo(PrivateRouter);
