import React from "react";
import { Grid } from "@mui/material";
import TopLike from "./TopLike";
import TopView from "./TopView";
const Main: React.FC = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-between"}
      sx={{ height: "100%" }}
    >
      <TopLike />
      <TopView />
    </Grid>
  );
};

export default React.memo(Main);
