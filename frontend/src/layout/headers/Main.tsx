import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import Logo from "./Logo";
import { Grid } from "@mui/material";
import { RootState } from "../../store/configureStore";

import "../../assets/layout/header.scss";
const Main: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authText = isAuth ? "auth" : "unauth";
  const Body = lazy(() => import(`./${authText}/Main.tsx`));
  const Profile = lazy(() => import(`./${authText}/Profile.tsx`));
  const Menu = lazy(() => import(`./${authText}/Menu.tsx`));
  return (
    <Grid container className="app-header" columnSpacing={2}>
      <Grid item className="app-header__left" xs>
        <Logo />
        <Suspense fallback={<></>}>
          <Body />
        </Suspense>
      </Grid>
      <Grid item className="app-header__right">
        <Suspense fallback={<></>}>
          <Profile />
        </Suspense>
      </Grid>
      <Grid item className="app-header__mobile-menu">
        <Suspense fallback={<></>}>
          <Menu />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
