import React from "react";
import { Button, Grid } from "@mui/material";
const Profile: React.FC = () => {
  return (
    <Grid container className="app-header__unauth-profile" columnSpacing={1}>
      <Grid item>
        <Button
          variant="outlined"
          className="app-header__unauth-profile__btn-log-in"
        >
          Log In
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          className="app-header__unauth-profile__btn-sign-up"
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
