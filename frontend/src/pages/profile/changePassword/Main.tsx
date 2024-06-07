import React, { useEffect, useState } from "react";
import { Card, Form } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import RemoveIcon from "@mui/icons-material/Remove";
import { TextListClass } from "../../../utils/textContent";
import { Divider, Button, Grid } from "@mui/material";
import { ChangePasswordFormType } from "../../../services/types/changePass";
import {
  handleSubmit,
  cleanChangepass,
} from "../../../services/actions/changePassword";
const Main = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [31, 1630, 1644, 1645, 1646, 1647, 1648, 1649]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
    return () => {
      dispatch(cleanChangepass());
    };
  }, [LanguageId]);
  return (
    <Card>
      <div className="profile-change-pass profile-card">
        <div className=" profile-card__header">{text?.getText(1630)}</div>
        <Divider className="profile-card__divider" />
        <Grid
          container
          className="profile-change-pass__body profile-card__body"
        >
          <Grid item xs={6} className="profile-change-pass__body__left">
            <Form
              reduxConnectionString={"changePassword"}
              formElements={ChangePasswordFormType}
            />
          </Grid>
          <Grid item xs={6} className="profile-change-pass__body__right">
            <div className="profile-change-pass__body__right__header">
              {text?.getText(1644)}
            </div>
            <ul className="profile-change-pass__body__right__body">
              {[1645, 1646, 1647, 1648, 1649].map((e) => {
                return (
                  <>
                    <li
                      key={e}
                      className="profile-change-pass__body__right__body__item"
                    >
                      <RemoveIcon className="profile-change-pass__body__right__body__item__icon" />
                      {text?.getText(e)}
                    </li>
                    {e !== 1649 && (
                      <Divider className="profile-card__divider" />
                    )}
                  </>
                );
              })}
            </ul>
          </Grid>
          <Grid item xs={12} className="profile-change-pass__body__footer">
            <Button
              variant="contained"
              className="profile-change-pass__body__footer__save"
              onClick={() => {
                dispatch(handleSubmit());
              }}
            >
              {text?.getText(31)}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default Main;
