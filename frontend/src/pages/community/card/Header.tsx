import React from "react";
import { Avatar, Grid, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
interface HeaderType {
  photo: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

const Main: React.FC<HeaderType> = (props) => {
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
          <IconButton className="community-container__main-box__item__body__header__btn">
            <InfoOutlinedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
