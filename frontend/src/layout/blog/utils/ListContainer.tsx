import React from "react";
import { Grid } from "@mui/material";
import ListItem from "./ListItem";
import "../../../assets/layout/blog/list.scss";

export interface ListItemProps {
  uuid: string;
  likes: number[];
  dislikes: number[];
  title: string;
  views: number[];
}
interface ListContainerProps {
  title: string;
  data: ListItemProps[];
}

const ListContainer: React.FC<ListContainerProps> = (props) => {
  return (
    <Grid container className="list">
      <Grid item xs={12} className="list__header">
        {props.title}
      </Grid>
      {props.data.map((e: ListItemProps) => (
        <ListItem {...e} />
      ))}
    </Grid>
  );
};

export default React.memo(ListContainer);
