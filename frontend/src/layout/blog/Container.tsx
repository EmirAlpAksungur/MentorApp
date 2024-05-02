import React from "react";
import { Outlet } from "react-router-dom";
import { Grid, ButtonGroup, Button } from "@mui/material";
import TopLike from "./toplists/TopLike";
import TopWiew from "./toplists/TopWiew";
import { routeToUrl } from "../../routers/utils";
import "../../assets/pages/blog/blog.scss";

const Main: React.FC = () => {
  return (
    <Grid container className={"blog-container"}>
      <Grid
        item
        lg={2}
        className={"blog-container__border-right blog-container__top-list"}
      >
        <TopLike />
      </Grid>
      <Grid item xs={12} lg={8} className={"blog-container__border-right"}>
        <Grid
          container
          justifyContent={"center"}
          className="blog-container__body"
        >
          <Grid item xs={9} className="blog-container__body__btn-group">
            <ButtonGroup
              variant="contained"
              className="blog-container__body__btn-group__container"
            >
              <Button
                className="blog-container__body__btn-group__container__btn"
                onClick={() => routeToUrl("/blog/home")}
              >
                Home
              </Button>
              <Button
                className="blog-container__body__btn-group__container__btn"
                onClick={() => routeToUrl("/blog/explore")}
              >
                Explore
              </Button>
              <Button
                className="blog-container__body__btn-group__container__btn"
                onClick={() => routeToUrl("/blog/profile")}
              >
                Profile
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={2} className={"blog-container__top-list"}>
        <TopWiew />
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
