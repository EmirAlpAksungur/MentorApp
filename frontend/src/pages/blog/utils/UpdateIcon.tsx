import React from "react";
import { Grid, IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";

import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BlogType } from "../BlogBody";
import {
  handleBlogUpdate,
  handleBlogDelete,
} from "../../../services/actions/blog";
const Main: React.FC<BlogType> = (params) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state?.auth?.user?.user);

  return (
    userId === params.user.id && (
      <>
        <IconButton
          className="blog-container__body__accordion__header__details__container__update-icon"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(
              handleBlogUpdate({
                uuid: params.uuid,
                photo: params.photo,
                blog: params.blog,
                title: params.title,
                summary: params.summary,
              })
            );
          }}
        >
          <AutoFixNormalIcon />
        </IconButton>
        <IconButton
          className="blog-container__body__accordion__header__details__container__update-icon"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(handleBlogDelete(params.uuid));
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </>
    )
  );
};

export default React.memo(Main);
