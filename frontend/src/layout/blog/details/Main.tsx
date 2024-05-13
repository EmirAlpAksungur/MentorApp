import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import BlogBody from "./BlogBody";
import { BlogType } from "./BlogBody";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import LoadingComp from "../../../components/loading/LoadingComp";
import CloseIcon from "@mui/icons-material/Close";
import BlogService from "../../../services/api/blog";
import history from "../../../routers/history";
const Main: React.FC = (props: any) => {
  let [data, setData] = useState<BlogType | null>(null);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const asyncHelper = async () => {
    try {
      const body = { uuid: props.uuid };
      let res = await BlogService.blogDetails(body, token);
      console.log(res);

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    asyncHelper();
  }, []);
  if (data)
    return (
      <Box className={"blog-container__body__dialog"}>
        <Box
          className={"blog-container__body__btn-close"}
          id="draggable-dialog-title"
        >
          <IconButton
            className={"blog-container__body__btn-close__btn"}
            onClick={() => {
              let url = window.location.pathname.split("/");
              url.pop();
              let urlStr = url.join("/");
              history.push(urlStr);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <BlogBody data={data} />
        <Box className={"blog-container__body__content"}>{data?.blog}</Box>
      </Box>
    );
  else return <LoadingComp />;
};

export default Main;
