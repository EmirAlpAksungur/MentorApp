import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import {
  MyTextField,
  MyLongTextField,
  ImageSelect,
  LocationSelect,
  UniversitySelect,
  UniversityContainer,
} from "../index";
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
    case "image":
      return (
        <ImageSelect
          value={value}
          handleChangeFunc={(val: Blob | null) => {
            helperUpdateValue(val);
          }}
        />
      );
    case "location":
      return (
        <LocationSelect
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
        />
      );
    case "university":
      return (
        <UniversityContainer
          value={value}
          handleChangeFunc={(val: number[]) => {
            helperUpdateValue(val);
          }}
        ></UniversityContainer>
      );
    default:
      return <></>;
  }
};

export default FormSplitter;
