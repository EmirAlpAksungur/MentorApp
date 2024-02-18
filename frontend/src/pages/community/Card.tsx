import React from "react";
import { Button, Divider } from "@mui/material";
import { TranslatedTextType } from "../../services/types/translations";

interface UserType {
  first_name: string;
  last_name: string;
  email: string;
}
export interface CardPropType {
  mentorInfo: string;
  studentInfo: string;
  user: UserType;
  text: TranslatedTextType[];
}

const Main: React.FC<CardPropType> = (props) => {
  return (
    <div className="community-container__main-box__item__body">
      <div className="community-container__main-box__item__body__header">
        {props.user?.first_name} {props.user?.last_name}
      </div>
      <Divider className="community-container__main-box__item__body__divider" />
      <div className="community-container__main-box__item__body__title">
        {props.text.find((e) => e?.TextContentId === 35)?.Translations}
      </div>
      <div className="community-container__main-box__item__body__content">
        {props.mentorInfo}
      </div>
      <div className="community-container__main-box__item__body__title">
        {props.text.find((e) => e?.TextContentId === 36)?.Translations}
      </div>
      <div className="community-container__main-box__item__body__content">
        {props.studentInfo}
      </div>
      <Button className="community-container__main-box__item__body__btn">
        {props.text.find((e) => e?.TextContentId === 34)?.Translations}
      </Button>
    </div>
  );
};

export default React.memo(Main);
