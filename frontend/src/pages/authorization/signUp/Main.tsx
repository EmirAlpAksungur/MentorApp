import React, { useEffect, useState } from "react";
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
import "../../../assets/pages/authentication/signUp.scss";
import "../../../assets/components/box/authentication.scss";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[] | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const errors = useAppSelector((state: RootState) => state.signup.errors);

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [5]);
    console.log(result);

    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
    return () => {
      dispatch(cleanSignUpForm());
    };
  }, [LanguageId]);
  return (
    <div className="sign-up-container">
      <Card
        isError={Object.values(errors).some(
          (value) => typeof value === "number"
        )}
      >
        <div className="authentication-box">
          <ErrorComponent errMsg="error">
            {text ? (
              <>
                <div className="authentication-box__header">
                  {text?.find((e) => e?.TextContentId === 5)?.Translations}
                </div>
                <Divider className="authentication-box__divider" />
                <div className="authentication-box__body">
                  <Form
                    reduxConnectionString={"signup"}
                    formElements={SignUpFormType}
                  />

                  <Button
                    variant="contained"
                    className="authentication-box__body__btn"
                    onClick={() => {
                      dispatch(handleSubmit());
                    }}
                  >
                    {text?.find((e) => e?.TextContentId === 5)?.Translations}
                  </Button>
                </div>
              </>
            ) : (
              <LoadingComponent />
            )}
          </ErrorComponent>
        </div>
      </Card>
    </div>
  );
};

export default Main;
