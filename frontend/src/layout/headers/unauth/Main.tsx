import React from "react";
import { Button, Grid } from "@mui/material";
import ThemeSelect from "./ThemeSelect";
import LangSelect from "./LangSelect";
import "../../../assets/layout/header.scss";
const Main: React.FC = () => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      className="app-header__left__unauth-profile"
    >
      <Grid item>
        <Grid container columnGap={2}>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
            >
              Find new mentor
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
            >
              Blog
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container columnGap={2} alignItems={"center"}>
          <Grid item>
            <LangSelect />
          </Grid>
          <Grid item>
            <ThemeSelect />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
