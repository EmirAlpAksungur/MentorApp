import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import BlogService from "../../../services/api/blog";
import ListContainer from "../utils/ListContainer";
const Main: React.FC = () => {
  const [data, setData] = useState([]);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const asyncHelper = async () => {
    try {
      let res = await BlogService.blogTopLikes(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    asyncHelper();
  }, []);
  return (
    <Grid container>
      <ListContainer title="Tow Likes" data={data} />
    </Grid>
  );
};

export default React.memo(Main);
