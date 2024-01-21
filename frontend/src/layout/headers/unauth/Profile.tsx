import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import TranslationsService from "../../../services/api/translations";
import { TranslatedTextType } from "../../../services/types/translations";
const Profile: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);

  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const asyncLoadText = async () => {
    try {
      let res = await TranslationsService.getTranslationsById({
        LanguageId,
        TextContentIds: [4, 5],
      });
      setText(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    asyncLoadText();
  }, [LanguageId]);

  return (
    <Grid container className="app-header__unauth-profile" columnSpacing={1}>
      <Grid item>
        <Button
          variant="outlined"
          className="app-header__unauth-profile__btn-log-in"
        >
          {text.find((e) => e?.TextContentId === 4)?.Translations}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          className="app-header__unauth-profile__btn-sign-up"
        >
          {text.find((e) => e?.TextContentId === 5)?.Translations}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
