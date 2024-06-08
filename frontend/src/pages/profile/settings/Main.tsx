import React, { useEffect, useState } from "react";
import { Card, ThemeSwitch, Language } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TranslateIcon from "@mui/icons-material/Translate";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextListClass } from "../../../utils/textContent";
import { Divider, Button, Grid } from "@mui/material";
import { deleteAccount } from "../../../services/actions/auth";
const Main = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <Card>
          <div className="profile-settings profile-card">
            <div className=" profile-card__header">{text?.getText(1631)}</div>
            <Divider className="profile-card__divider" />
            <div className="profile-settings__body profile-card__body">
              <div className="profile-settings__body__item">
                <div className="profile-settings__body__item__comment">
                  <ColorLensIcon className="profile-settings__body__item__comment__icon" />
                  <div className="profile-settings__body__item__comment__text">
                    <div className="profile-settings__body__item__comment__text__header">
                      {text?.getText(1632)}
                    </div>
                    <div className="profile-settings__body__item__comment__text__body">
                      {text?.getText(1633)}
                    </div>
                  </div>
                </div>

                <div className="profile-settings__body__item__switch">
                  <ThemeSwitch />
                </div>
              </div>
              <Divider className="profile-settings__body__divider" />
              <div className="profile-settings__body__item">
                <div className="profile-settings__body__item__comment">
                  <TranslateIcon className="profile-settings__body__item__comment__icon" />
                  <div className="profile-settings__body__item__comment__text">
                    <div className="profile-settings__body__item__comment__text__header">
                      {text?.getText(1634)}
                    </div>
                    <div className="profile-settings__body__item__comment__text__body">
                      {text?.getText(1635)}
                    </div>
                  </div>
                </div>

                <div className="profile-settings__body__item__language-select">
                  <Language />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <div className="profile-settings profile-card">
            <div className=" profile-card__header">{text?.getText(1636)}</div>
            <Divider className="profile-card__danger-divider" />
            <div className="profile-settings__body profile-card__body">
              <div className="profile-settings__body__item">
                <div className="profile-settings__body__item__comment">
                  <DeleteIcon className="profile-settings__body__item__comment__icon-danger" />
                  <div className="profile-settings__body__item__comment__text">
                    <div className="profile-settings__body__item__comment__text__header">
                      {text?.getText(1637)}
                    </div>
                    <div className="profile-settings__body__item__comment__text__body">
                      {text?.getText(1638)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  className="profile-settings__body__item__danger-btn"
                  onClick={() => {
                    dispatch(deleteAccount());
                  }}
                >
                  {text?.getText(1637)}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Main;
