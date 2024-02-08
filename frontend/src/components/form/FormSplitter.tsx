import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { MyTextField, MyLongTextField } from "../index";
import { FormSplitterType } from "../../services/types/form";
import { updateFormValue } from "../../services/actions/form";
const FormSplitter: React.FC<FormSplitterType> = ({
  reduxConnectionString,
  reduxKey,
  type,
}) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(
    (state: RootState) => state[reduxConnectionString]?.values?.[reduxKey]
  );
  const helperUpdateValue = (val: any) => {
    dispatch(updateFormValue(reduxConnectionString, reduxKey, val));
  };

  switch (type) {
    case "string":
      return (
        <MyTextField
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
        />
      );
    case "long-string":
      return (
        <MyLongTextField
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
        />
      );
    case "password":
      return (
        <MyTextField
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
          type="password"
        />
      );
    default:
      return <></>;
  }
};

export default FormSplitter;
