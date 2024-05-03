import React from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import UpdateIcon from "./utils/UpdateIcon";
import IconGroup from "./utils/IconGroup";
import BlogService from "../../services/api/blog";
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
  blogList: BlogType[];
}
const Main: React.FC<BlogBodyType> = ({ blogList }) => {
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const userId = useAppSelector((state: RootState) => state?.auth?.user?.user);

  const handleSummaryClick = (uuid: string, views: number[]) => {
    if (!views.includes(userId)) BlogService.blogAddView({ uuid }, token);
  };

  return (
    <div>
      {blogList.map((e: BlogType) => {
        return (
          <Accordion key={e.uuid} className="blog-container__body__accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={() => {
                handleSummaryClick(e.uuid, e.views);
              }}
            >
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
                      <IconGroup
                        likes={e.likes}
                        dislikes={e.dislikes}
                        views={e.views}
                        uuid={e.uuid}
                      />
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
