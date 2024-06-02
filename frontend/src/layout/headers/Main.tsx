import React, { Suspense, lazy } from "react";

import Logo from "./Logo";
import { Grid } from "@mui/material";
import Body from "./auth/Main";
import Profile from "./auth/Profile";
import Menu from "./auth/Menu";
import "../../assets/layout/header.scss";
const Main: React.FC = () => {
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
