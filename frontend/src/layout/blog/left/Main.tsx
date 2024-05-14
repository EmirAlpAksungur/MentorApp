import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import ListContainer from "../utils/ListContainer";
const Main: React.FC = () => {
  const data = useAppSelector(
    (state: RootState) => state.auth?.user?.savedBlog
  );

  return (
    <Grid container>
      <ListContainer title="Saved" data={data} />
    </Grid>
  );
};

export default React.memo(Main);
