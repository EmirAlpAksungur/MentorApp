import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import BlogBody from "./BlogBody";
import BlogService from "../../services/api/blog";
import { BlogType } from "./BlogBody";
const Main: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const follows = useAppSelector(
    (state: RootState) => state.auth?.user?.follows
  );
  const [blogList, setBlogList] = useState<BlogType[]>([]);

  const asyncLoad = async () => {
    try {
      const body = { follows };
      let res = await BlogService.getBlogHomeList(body, token);
      setBlogList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    asyncLoad();
    return () => {
      setBlogList([]);
    };
  }, []);
  return (
    <Grid container className="blog-container__body__home">
      <BlogBody blogList={blogList} />
    </Grid>
  );
};

export default React.memo(Main);
