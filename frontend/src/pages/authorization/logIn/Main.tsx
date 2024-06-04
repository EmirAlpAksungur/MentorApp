import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { Button } from "@mui/material";
import {
  Form,
  Card,
  LoadingComponent,
  ErrorComponent,
  MyCheckbox,
} from "../../../components";
import { LoginFormType } from "../../../services/types/login";
import { handleSubmit, cleanLoginForm } from "../../../services/actions/login";
import "../../../assets/pages/authentication/authentication.scss";
import "../../../assets/components/box/authentication.scss";
import { TextListClass } from "../../../utils/textContent";
import history from "../../../routers/history";
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const [value, setValue] = useState<boolean>(false);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const errors = useAppSelector((state: RootState) => state.login.errors);

  const handleKeepSignIn = (val: boolean) => {
    setValue(val);
  };

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [4, 1519, 1520, 1521]);
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
    return () => {
      dispatch(cleanLoginForm());
    };
  }, [LanguageId]);

  return (
    <>
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
                  <div className="authentication-box__header__left">
                    {text?.getText(4)}
                  </div>
                  <div
                    className="authentication-box__header__right"
                    onClick={() => {
                      history.push("/auth/sign-up");
                    }}
                  >
                    {text?.getText(1519)}
                  </div>
                </div>
                <div className="authentication-box__body">
                  <Form
                    reduxConnectionString={"login"}
                    formElements={LoginFormType}
                  />
                  <div className="authentication-box__body__details">
                    <div className="authentication-box__body__details__left">
                      <MyCheckbox
                        label={text?.getText(1520)}
                        value={value}
                        handleChangeFunc={handleKeepSignIn}
                      />
                    </div>
                    <div className="authentication-box__body__details__right">
                      {text?.getText(1521)}
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    className="authentication-box__body__btn"
                    onClick={() => {
                      dispatch(handleSubmit());
                    }}
                  >
                    {text?.getText(4)}
                  </Button>
                </div>
              </>
            ) : (
              <LoadingComponent />
            )}
          </ErrorComponent>
        </div>
      </Card>
      {children}
    </>
  );
};

export default Main;
