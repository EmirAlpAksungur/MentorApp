import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import { Divider, Button } from "@mui/material";
import {
  ErrorComponent,
  Form,
  Card,
  LoadingComponent,
} from "../../../components";
import { SignUpFormType } from "../../../services/types/signUp";
import {
  cleanSignUpForm,
  handleSubmit,
} from "../../../services/actions/signup";
import history from "../../../routers/history";
import "../../../assets/pages/authentication/authentication.scss";
import "../../../assets/components/box/authentication.scss";
import { TextListClass } from "../../../utils/textContent";
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const errors = useAppSelector((state: RootState) => state.signup.errors);
  const nestedTextElement: string | undefined = text?.getNestedText(1525);
  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [5, 1517, 1522, 1523, 1524, 1525]
    );

    Array.isArray(result) && setText(new TextListClass(result));
  };
  useEffect(() => {
    helperAsync();
    return () => {
      dispatch(cleanSignUpForm());
    };
  }, [LanguageId]);
  const addOnClick = () => {
    $(`.regex-1517`).on("click", () => {
      // handlePrivacyClick();
    });
    $(`.regex-1523`).on("click", () => {
      // handlePrivacyClick();
    });
  };

  const cleanOnClick = () => {
    $(`.regex-1517`).off("click");
    $(`.regex-1523`).off("click");
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  useEffect(() => {
    addOnClick();
    return () => {
      cleanOnClick();
    };
  }, [nestedTextElement]);

  if (nestedTextElement)
    return (
      <>
        <Card
          isError={Object.values(errors).some(
            (value) => typeof value === "number"
          )}
        >
          <div className="authentication-box">
            <ErrorComponent errMsg="error">
              <div className="authentication-box__header">
                <div className="authentication-box__header__left">
                  {text?.getText(5)}
                </div>
                <div
                  className="authentication-box__header__right"
                  onClick={() => {
                    history.push("/auth/login");
                  }}
                >
                  {text?.getText(1522)}
                </div>
              </div>
              <div className="authentication-box__body">
                <Form
                  reduxConnectionString={"signup"}
                  formElements={SignUpFormType}
                />
                <div className="authentication-box__body__details__sign-up">
                  <span
                    dangerouslySetInnerHTML={{ __html: nestedTextElement }}
                  />
                </div>
                <Button
                  variant="contained"
                  className="authentication-box__body__btn"
                  onClick={() => {
                    dispatch(handleSubmit());
                  }}
                >
                  {text?.getText(1524)}
                </Button>
              </div>
            </ErrorComponent>
          </div>
        </Card>
        {children}
      </>
    );
  return <LoadingComponent />;
};

export default Main;
