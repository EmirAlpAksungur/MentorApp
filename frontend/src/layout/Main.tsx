import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import Header from "./headers/Main";
interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header></Header>
      </Grid>
      {children}
      <br />
      {process.env.name}
    </Grid>
  );
};

export default React.memo(Main);
