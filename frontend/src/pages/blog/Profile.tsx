import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import CreateBlog from "./CreateBlog";
import BlogBody from "./BlogBody";
import BlogService from "../../services/api/blog";
import { BlogType } from "./BlogBody";

const Main: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [blogList, setBlogList] = useState<BlogType[]>([]);

  const asyncLoad = async () => {
    try {
      let res = await BlogService.getBlogProfileList(token);
      console.log(res);
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
    <Grid
      container
      key={"blog-profile"}
      className="blog-container__body__profile"
    >
      <Grid item xs={12}>
        <CreateBlog />
      </Grid>
      <Grid item xs={12}>
        <BlogBody blogList={blogList} />
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
