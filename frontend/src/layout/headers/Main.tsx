import React, { ReactNode } from "react";

import Logo from "./Logo";
import { Grid } from "@mui/material";
import "../../assets/layout/header.scss";
const Main: React.FC = () => {
  return (
    <Grid container className="app-header">
      <Grid item>
        <Logo />
        <Logo />
      </Grid>
      <Grid item>
        <Logo />
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
