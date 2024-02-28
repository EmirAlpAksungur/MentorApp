import React, { useEffect, useState } from "react";
import { MyDialog } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { Button } from "@mui/material";
import { asyncLoadText } from "../../services/actions/translations";
import { TranslatedTextType } from "../../services/types/translations";
import { RootState } from "../../store/configureStore";
import { ElementProps } from "../../components/dialog/Main";
import { Form } from "../../components";
import { FirstLoginFormType } from "../../services/types/firstLogin";
import { handleSubmit } from "../../services/actions/firstLogin";
import "../../assets/pages/firstLogin/dialog.scss";

const Element: React.FC<ElementProps> = ({ width, height }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [31]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <div
      style={{
        width,
        height,
        overflow: "auto",
      }}
      className="first-login-dialog"
    >
      <div className="first-login-dialog__form">
        <Form
          reduxConnectionString={"firstLogin"}
          formElements={FirstLoginFormType}
        />
      </div>
      <Button
        variant="contained"
        className="first-login-dialog__btn"
        onClick={() => {
          dispatch(handleSubmit());
        }}
      >
        {text.find((e) => e?.TextContentId === 31)?.Translations}
      </Button>
    </div>
  );
};

const Main: React.FC = () => {
  const isFilled = useAppSelector(
    (state: RootState) => state.auth.user?.isFilled
  );

  return (
    <div>
      <MyDialog
        Element={Element}
        closeProtection={true}
        Button={() => <></>}
        defaultWH={[412, 370]}
        defaultOpen={!isFilled}
        hideBackdrop={false}
      />
    </div>
  );
};

export default Main;
