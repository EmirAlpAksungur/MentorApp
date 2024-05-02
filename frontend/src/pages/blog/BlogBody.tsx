import React from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import UpdateIcon from "./utils/UpdateIcon";
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
  likes: number;
  dislikes: number;
  views: number;
}

export interface BlogBodyType {
  blogList: BlogType[];
}
const Main: React.FC<BlogBodyType> = ({ blogList }) => {
  return (
    <div>
      {blogList.map((e: BlogType) => {
        return (
          <Accordion key={e.uuid} className="blog-container__body__accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid
                container
                className="blog-container__body__accordion__header"
              >
                <Grid
                  item
                  xs={9}
                  className="blog-container__body__accordion__header__img-blog"
                  sx={{
                    width: "100px !important",
                    background: `url("data:image/png;base64,${e?.photo}")`,
                  }}
                >
                  <Box className="blog-container__body__accordion__header__img-blog__header">
                    {e?.title}
                  </Box>
                  <Box className="blog-container__body__accordion__header__img-blog__gradiant"></Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className="blog-container__body__accordion__header__details"
                >
                  <Grid
                    container
                    alignContent="space-between"
                    rowSpacing={2}
                    className="blog-container__body__accordion__header__details__container"
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Grid
                          item
                          className="blog-container__body__accordion__header__details__container__user-name"
                        >
                          {e?.user?.name}
                        </Grid>
                        <Grid item>
                          <UpdateIcon {...e} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className="blog-container__body__accordion__header__details__container__summary"
                    >
                      {e?.summary}
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={4}>
                          <ThumbUpIcon fontSize="small" /> {e?.likes}
                        </Grid>
                        <Grid item xs={4}>
                          <ThumbDownIcon fontSize="small" /> {e?.dislikes}
                        </Grid>
                        <Grid item xs={4}>
                          <RemoveRedEyeIcon fontSize="small" /> {e?.views}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>{e.blog}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default React.memo(Main);
