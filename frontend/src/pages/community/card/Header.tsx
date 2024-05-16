import React from "react";
import { Avatar, Grid } from "@mui/material";
import MainDetails from "./details/MainDetails";
import { CardPropType } from "./Card";

const Main: React.FC<CardPropType> = (props) => {
  console.log(props);

  return (
    <div className="community-container__main-box__item__body__header">
      <Grid
        container
        columnGap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid item>
          <Avatar src={`data:image/jpeg;base64,${props?.photo}`} />
        </Grid>
        <Grid
          item
          className="community-container__main-box__item__body__header__name"
        >
          {props.user?.first_name} {props.user?.last_name}
        </Grid>
        <Grid item>
          <MainDetails {...props} />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
