import React from "react";
import { Button, Divider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { TranslatedTextType } from "../../../services/types/translations";
import { RootState } from "../../../store/configureStore";
import Header from "./Header";
import KnownSkill from "../../../components/view/KnownSkill";
import UnKnownSkill from "../../../components/view/UnKnownSkill";
import { sendMessage } from "../../../services/actions/chat";
import { Card } from "../../../components";
interface UserType {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
}
interface Certificate {
  photo: string;
}
interface Languages {
  photo: string;
}
interface References {
  photo: string;
}
export interface CardPropType {
  about: string;
  certificate: Certificate[];
  dislikes: number;
  likes: number;
  knownSkills: number[];
  unKnownSkills: string[];
  languages: Languages[];
  photo: string;
  references: References[];
  university: number[];
  user: UserType;
  text: TranslatedTextType[];
  profession: string;
}

const Main: React.FC<CardPropType> = (props) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.user?.user);
  const handleSubmit = async () => {
    dispatch(sendMessage(userId, props.user.id));
  };

  return (
    <Card>
      <div className="community-container__main-box__item__body">
        <div>
          <Header {...props} />
          <Divider className="community-container__main-box__item__body__divider" />
          <div className="community-container__main-box__item__body__title">
            {props.text.find((e) => e?.TextContentId === 35)?.Translations}
          </div>
          <div className="community-container__main-box__item__body__content">
            <KnownSkill knownSkills={props?.knownSkills} />
          </div>
          <div className="community-container__main-box__item__body__title">
            {props.text.find((e) => e?.TextContentId === 36)?.Translations}
          </div>
          <div className="community-container__main-box__item__body__content">
            <UnKnownSkill unKnownSkills={props?.unKnownSkills} />
          </div>
        </div>
        <Button
          className="community-container__main-box__item__body__btn"
          onClick={handleSubmit}
        >
          {props.text.find((e) => e?.TextContentId === 34)?.Translations}
        </Button>
      </div>
    </Card>
  );
};

export default React.memo(Main);
