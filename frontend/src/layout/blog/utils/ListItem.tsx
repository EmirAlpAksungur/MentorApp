import React from "react";
import { Grid } from "@mui/material";
import { ListItemProps } from "./ListContainer";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BlogService from "../../../services/api/blog";
import history from "../../../routers/history";
const Main: React.FC<ListItemProps> = (props) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const userId = useAppSelector((state: RootState) => state?.auth?.user?.user);

  const handleSummaryClick = (uuid: string, views: number[]) => {
    if (!views.includes(userId)) BlogService.blogAddView({ uuid }, token);
  };
  const handleClick = () => {
    let path = window.location.pathname.split("/");
    path[3] = props?.uuid;
    let urlStr = path.join("/");
    handleSummaryClick(props?.uuid, props?.views);
    history.push(urlStr);
  };
  return (
    <Grid item xs={12} className="list__item" onClick={handleClick}>
      <Grid container justifyContent={"space-between"}>
        <Grid item>{props.title}</Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Grid container alignItems={"center"} spacing={0.5}>
                <Grid item>
                  <ThumbUpIcon fontSize="small" className="list__item__like" />
                </Grid>
                <Grid item>{props?.likes?.length}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems={"center"} spacing={0.5}>
                <Grid item>
                  <ThumbDownIcon
                    fontSize="small"
                    className="list__item__dislike"
                  />
                </Grid>
                <Grid item>{props?.dislikes?.length}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems={"center"} spacing={0.5}>
                <Grid item>
                  <RemoveRedEyeIcon fontSize="small" />
                </Grid>
                <Grid item>{props?.views?.length}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
