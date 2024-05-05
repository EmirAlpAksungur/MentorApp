import React from "react";
import { Grid } from "@mui/material";
import "../../assets/components/connectionbar/connectionbar.scss";
interface ConnectionBarType {
  connection: number;
}

const Main: React.FC<ConnectionBarType> = ({ connection }) => {
  return (
    <Grid
      container
      className="connection-bar"
      columnGap={0.25}
      alignItems={"flex-end"}
    >
      {Array.from({ length: 5 }, (_, index) => index).map((e, i) => {
        if (i < connection)
          return (
            <Grid
              item
              key={`connection-${i}`}
              className="connection-bar__item connection-bar__item__success"
            ></Grid>
          );
        return (
          <Grid
            item
            key={`connection-${i}`}
            className="connection-bar__item"
          ></Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Main);
