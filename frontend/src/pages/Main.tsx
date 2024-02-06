import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { RootState } from "../store/configureStore";
import { asyncLoadText } from "../services/actions/translations";
import { TranslatedTextType } from "../services/types/translations";
import { Divider, Button } from "@mui/material";
import { Form } from "../components";
import { SignUpFormType } from "../services/types/signUp";
import { handleSubmit } from "../services/actions/signup";
import "../assets/pages/authentication/signUp.scss";
import "../assets/components/box/authentication.scss";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [5]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return <div className="sign-up-container"></div>;
};

export default Main;
