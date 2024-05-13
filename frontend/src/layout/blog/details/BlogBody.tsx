import React from "react";
import { Grid, Box } from "@mui/material";

import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import UpdateIcon from "../../../pages/blog/utils/UpdateIcon";
import IconGroup from "../../../pages/blog/utils/IconGroup";
import BlogService from "../../../services/api/blog";
import history from "../../../routers/history";
export interface BlogType {
  user: {
    name: string;
    id: number;
  };
  summary: string;
  photo: string;
  blog: string;
  title: string;
  uuid: string;
  likes: number[];
  dislikes: number[];
  views: number[];
}

export interface BlogBodyType {
  data: BlogType;
}

const Main: React.FC<BlogBodyType> = ({ data }) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const userId = useAppSelector((state: RootState) => state?.auth?.user?.user);

  const handleSummaryClick = (uuid: string, views: number[]) => {
    if (!views.includes(userId)) BlogService.blogAddView({ uuid }, token);
  };

  return (
    <Grid
      container
      className="blog-container__body__header"
      onClick={() => {
        if (window.location.pathname.split("/").length <= 3) {
          handleSummaryClick(data?.uuid, data?.views);
          history.push(`${window.location.pathname}/${data?.uuid}`);
        }
      }}
    >
      <Grid
        item
        className="blog-container__body__header__img-blog"
        sx={{
          width: "100px !important",
          background: `url("data:image/png;base64,${data?.photo}")`,
        }}
      >
        <Box className="blog-container__body__header__img-blog__header">
          {data?.title}
        </Box>
        <Box className="blog-container__body__header__img-blog__gradiant"></Box>
      </Grid>
      <Grid item className="blog-container__body__header__details">
        <Grid
          container
          alignContent="space-between"
          rowSpacing={2}
          className="blog-container__body__header__details__container"
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid
                item
                className="blog-container__body__header__details__container__user-name"
              >
                {data?.user?.name}
              </Grid>
              <Grid item>
                <UpdateIcon {...data} />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            className="blog-container__body__header__details__container__summary"
          >
            {data?.summary}
          </Grid>
          <Grid item xs={12}>
            <IconGroup
              likes={data?.likes}
              dislikes={data?.dislikes}
              views={data?.views}
              uuid={data?.uuid}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
