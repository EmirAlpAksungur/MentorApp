import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { routeToUrl } from "../../../routers/utils";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import "../../../assets/layout/header.scss";

const Main: React.FC = () => {
  const location = useLocation();
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [27, 28, 3, 2]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  const isActive = (path: string) => {
    if (location.pathname.split("/")?.[1] === path)
      return "app-header__left__unauth-profile__btn__active";
    return "";
  };
  return (
    <Grid
      container
      justifyContent={"space-between"}
      className="app-header__left__unauth-profile"
    >
      <Grid container columnGap={2}>
        <Grid item>
          <Button
            variant="text"
            className={
              "app-header__left__unauth-profile__btn " + isActive("community")
            }
            onClick={() => routeToUrl("/community")}
          >
            {text.find((e) => e?.TextContentId === 27)?.Translations}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            className={
              "app-header__left__unauth-profile__btn " + isActive("chat")
            }
            onClick={() => routeToUrl("/chat")}
          >
            {text.find((e) => e?.TextContentId === 28)?.Translations}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            className={
              "app-header__left__unauth-profile__btn " + isActive("blog")
            }
            onClick={() => routeToUrl("/blog/home")}
          >
            {text.find((e) => e?.TextContentId === 2)?.Translations}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            className={
              "app-header__left__unauth-profile__btn " + isActive("download")
            }
            onClick={() => routeToUrl("download")}
          >
            {text.find((e) => e?.TextContentId === 3)?.Translations}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
