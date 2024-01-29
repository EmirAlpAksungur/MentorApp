import React, { useState, useEffect } from "react";
import { Grid, InputLabel } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { InputsBodyType } from "../../services/types/form";
import { TranslatedTextType } from "../../services/types/translations";
import FormSplitter from "./FormSplitter";

import "../../assets/components/form/form.scss";
const InputsBody: React.FC<InputsBodyType> = ({
  formElement,
  reduxConnectionString,
}) => {
  const errorMsg = useAppSelector(
    (state: RootState) =>
      state[reduxConnectionString]?.errors?.[formElement.reduxKey]
  );
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [
      formElement.labelId,
      parseInt(errorMsg),
    ]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId, errorMsg]);

  return (
    <Grid item xs={formElement.size}>
      <InputLabel className="form-container__label">
        {
          text.find((e) => e?.TextContentId === formElement.labelId)
            ?.Translations
        }
      </InputLabel>
      <FormSplitter
        reduxConnectionString={reduxConnectionString}
        reduxKey={formElement.reduxKey}
        type={formElement.type}
      />
      <InputLabel className="form-container__error">
        {text.find((e) => e?.TextContentId === errorMsg)?.Translations}
      </InputLabel>
    </Grid>
  );
};

export default InputsBody;
