import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import { Divider, Button } from "@mui/material";
import { Form, LoadingComponent, ErrorComponent } from "../../../components";
import { LoginFormType } from "../../../services/types/login";
import { handleSubmit } from "../../../services/actions/login";
import "../../../assets/pages/authentication/signUp.scss";
import "../../../assets/components/box/authentication.scss";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[] | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [4]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return (
    <div className="sign-up-container">
      <div className="authentication-box">
        <ErrorComponent errMsg="error">
          {text ? (
            <>
              <div className="authentication-box__header">
                {text.find((e) => e?.TextContentId === 4)?.Translations}
              </div>
              <Divider className="authentication-box__divider" />
              <div className="authentication-box__body">
                <Form
                  reduxConnectionString={"login"}
                  formElements={LoginFormType}
                />

                <Button
                  variant="contained"
                  className="authentication-box__body__btn"
                  onClick={() => {
                    dispatch(handleSubmit());
                  }}
                >
                  {text.find((e) => e?.TextContentId === 4)?.Translations}
                </Button>
              </div>
            </>
          ) : (
            <LoadingComponent />
          )}
        </ErrorComponent>
      </div>
    </div>
  );
};

export default Main;
