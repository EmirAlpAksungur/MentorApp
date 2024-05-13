import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import BlogBody from "../../layout/blog/details/BlogBody";
import BlogService from "../../services/api/blog";
import { BlogType } from "../../layout/blog/details/BlogBody";
const Main: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [blogList, setBlogList] = useState<BlogType[]>([]);

  const asyncLoad = async () => {
    try {
      let res = await BlogService.getBlogList(token);
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
      <BlogBody data={blogList} />
    </Grid>
  );
};

export default React.memo(Main);
