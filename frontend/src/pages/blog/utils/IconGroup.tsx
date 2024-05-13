import React, { useEffect, useState } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BlogService from "../../../services/api/blog";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
interface ElementType {
  likes: number[];
  dislikes: number[];
  views: number[];
  uuid: string;
}

const Main: React.FC<ElementType> = ({ likes, dislikes, views, uuid }) => {
  const [copy, setCopy] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const userId = useAppSelector((state: RootState) => state?.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state?.auth?.token);

  const isLiked = async () => {
    if (likes?.includes(userId)) {
      setLikeCount(likes?.length - 1);
      setLike(1);
    } else {
      setLikeCount(likes?.length);
    }
  };
  const isDisliked = async () => {
    if (dislikes?.includes(userId)) {
      setDislikeCount(dislikes?.length - 1);
      setLike(-1);
    } else {
      setDislikeCount(dislikes?.length);
    }
  };

  useEffect(() => {
    isLiked();
    isDisliked();
    return () => {
      setLike(0);
      setLikeCount(0);
      setDislikeCount(0);
    };
  }, [uuid]);
  return (
    <Grid
      container
      className="blog-container__body__header__details__container__icon-group"
      columns={18}
    >
      <Grid item xs={4}>
        <IconButton
          className="blog-container__body__header__details__container__icon-group__btn"
          onClick={(event) => {
            event.stopPropagation();
            setLike((prev) => {
              if (prev === 1) {
                BlogService.likeBlog(
                  {
                    uuid: uuid,
                    from: prev,
                    to: 0,
                  },
                  token
                );
                return 0;
              }
              BlogService.likeBlog(
                {
                  uuid: uuid,
                  from: prev,
                  to: 1,
                },
                token
              );
              return 1;
            });
          }}
        >
          <ThumbUpIcon
            fontSize="small"
            sx={{
              color: like === 1 ? "green" : "",
            }}
          />
        </IconButton>
        {likeCount + (like === 1 ? 1 : 0)}
      </Grid>
      <Grid item xs={4}>
        <IconButton
          className="blog-container__body__header__details__container__icon-group__btn"
          onClick={(event) => {
            event.stopPropagation();
            setLike((prev) => {
              if (prev === -1) {
                BlogService.likeBlog(
                  {
                    uuid: uuid,
                    from: prev,
                    to: 0,
                  },
                  token
                );
                return 0;
              }
              BlogService.likeBlog(
                {
                  uuid: uuid,
                  from: prev,
                  to: -1,
                },
                token
              );
              return -1;
            });
          }}
        >
          <ThumbDownIcon
            fontSize="small"
            sx={{
              color: like === -1 ? "red" : "",
            }}
          />
        </IconButton>
        {dislikeCount + (like === -1 ? 1 : 0)}
      </Grid>
      <Grid item xs={4}>
        <IconButton
          disabled
          className="blog-container__body__header__details__container__icon-group__btn"
        >
          <RemoveRedEyeIcon fontSize="small" />
        </IconButton>
        {views?.length}
      </Grid>
      <Grid item xs={3}>
        <IconButton
          className="blog-container__body__header__details__container__icon-group__btn"
          onClick={() => {
            //handle save
          }}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <Tooltip open={copy} title="coppied">
          <IconButton
            className="blog-container__body__header__details__container__icon-group__btn"
            onClick={(event) => {
              setCopy(true);
              event.stopPropagation();
              let path = window.location.pathname.split("/");
              path[3] = uuid;
              let urlStr = path.join("/");
              const text = process.env.path + urlStr;
              var textarea = document.createElement("textarea");
              textarea.value = text;
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand("copy");
              document.body.removeChild(textarea);
              setTimeout(() => {
                setCopy(false);
              }, 1000);
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
