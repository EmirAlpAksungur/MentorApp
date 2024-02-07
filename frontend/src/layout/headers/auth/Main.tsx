import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import ThemeSelect from "../unauth/ThemeSelect";
import { routeToUrl } from "../../../routers/utils";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import "../../../assets/layout/header.scss";

const Main: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [27, 28, 3]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return (
    <Grid
      container
      justifyContent={"space-between"}
      className="app-header__left__unauth-profile"
    >
      <Grid item>
        <Grid container columnGap={2}>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
              onClick={() => routeToUrl("community")}
            >
              {text.find((e) => e?.TextContentId === 27)?.Translations}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
              onClick={() => routeToUrl("chat")}
            >
              {text.find((e) => e?.TextContentId === 28)?.Translations}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              className="app-header__left__unauth-profile__btn"
              onClick={() => routeToUrl("download")}
            >
              {text.find((e) => e?.TextContentId === 3)?.Translations}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container columnGap={2} alignItems={"center"}>
          <Grid item>
            <ThemeSelect />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
