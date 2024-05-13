import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Grid, ButtonGroup, Button } from "@mui/material";
import RightBox from "./right/Main";
import LeftBox from "./left/Main";
import { routeToUrl } from "../../routers/utils";
import "../../assets/pages/blog/blog.scss";
import { MyDialog } from "../../components";
import MainDetail from "./details/Main";
const Main: React.FC = () => {
  const location = useLocation();

  return (
    <Grid container className={"blog-container"}>
      <Grid
        item
        lg={2}
        className={"blog-container__border-right blog-container__top-list"}
      >
        <LeftBox />
      </Grid>
      <Grid item xs={12} lg={8} className={"blog-container__border-right"}>
        <Grid
          container
          justifyContent={"center"}
          className="blog-container__body"
          id={"blog-container-scroll"}
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
        <RightBox />
      </Grid>
      <MyDialog
        Element={MainDetail}
        closeProtection={true}
        Button={() => <></>}
        defaultWH={[750, 600]}
        defaultOpen={location.pathname.split("/").length > 3}
        hideBackdrop={true}
        uuid={location.pathname.split("/")?.[3]}
      />
    </Grid>
  );
};

export default React.memo(Main);
