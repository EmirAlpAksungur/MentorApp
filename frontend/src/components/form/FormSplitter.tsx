import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import {
  MyTextField,
  MyLongTextField,
  ImageSelect,
  LocationSelect,
  UniversityContainer,
  CertificateContainer,
  SkillSelect,
  Password,
  DatePicker,
  LanguageSelect,
} from "../index";
import { CertificateElementType } from "../inputs/containers/CertificateContainer";
import { FormSplitterType } from "../../services/types/form";
import { updateFormValue } from "../../services/actions/form";
import MyUnKnownSkillSelect from "../inputs/UnKnownSkillSelect";
import { UnKnownSkillsType } from "../../services/types/unKnownSkills";
import { LanguageType } from "../../services/types/languages";
const FormSplitter: React.FC<FormSplitterType> = ({
  reduxConnectionString,
  reduxKey,
  type,
  error,
  ...rest
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
          error={error}
        />
      );
    case "long-string":
      return (
        <MyLongTextField
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
          error={error}
          {...rest}
        />
      );
    case "password":
      return (
        <Password
          value={value}
          handleChangeFunc={(val: string) => {
            helperUpdateValue(val);
          }}
          error={error}
        />
      );
    case "image":
      return (
        <ImageSelect
          value={value}
          handleChangeFunc={(val: string | null) => {
            helperUpdateValue(val);
          }}
          className="my-image-select__btn-rounded"
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
    case "languages":
      return (
        <LanguageSelect
          value={value}
          handleChangeFunc={(val: LanguageType[]) => {
            helperUpdateValue(val);
          }}
        ></LanguageSelect>
      );
    case "certificate":
      return (
        <CertificateContainer
          value={value}
          handleChangeFunc={(val: CertificateElementType[]) => {
            helperUpdateValue(val);
          }}
        ></CertificateContainer>
      );
    case "knownSkills":
      return (
        <SkillSelect
          value={value}
          handleChangeFunc={(val: number[]) => {
            helperUpdateValue(val);
          }}
        ></SkillSelect>
      );
    case "unKnownSkills":
      return (
        <MyUnKnownSkillSelect
          value={value}
          handleChangeFunc={(val: UnKnownSkillsType[]) => {
            helperUpdateValue(val);
          }}
        ></MyUnKnownSkillSelect>
      );
    case "datepicker":
      return (
        <DatePicker
          value={value}
          handleChangeFunc={(value: number) => {
            helperUpdateValue(value);
          }}
        />
      );
    default:
      return <></>;
  }
};

export default FormSplitter;
