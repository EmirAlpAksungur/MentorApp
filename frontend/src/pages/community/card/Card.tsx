import React from "react";
import { Avatar, Button, Divider, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { TranslatedTextType } from "../../../services/types/translations";
import { RootState } from "../../../store/configureStore";
import ChatService from "../../../services/api/chat";
import history from "../../../routers/history";
import { changeSelectedChat } from "../../../services/actions/chat";
import Header from "./Header";
import KnownSkill from "../../../components/view/KnownSkill";
import UnKnownSkill from "../../../components/view/UnKnownSkill";
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
}

const Main: React.FC<CardPropType> = (props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  const userId = useAppSelector((state: RootState) => state.auth.user?.user);
  const handleSubmit = async () => {
    let chatId = "";

    userId > props.user.id
      ? (chatId = props.user.id.toString() + "_" + userId.toString())
      : (chatId = userId.toString() + "_" + props.user.id.toString());

    try {
      const body = {
        id: chatId,
        participants: [userId, props.user.id],
        messages: [],
      };
      console.log(body);

      let res = await ChatService.startChat(body, token);
      history.push("/chat");
      dispatch(changeSelectedChat(chatId));
    } catch (err) {
      history.push("/chat");
      dispatch(changeSelectedChat(chatId));
    }
  };
  console.log(props);

  return (
    <div className="community-container__main-box__item__body">
      <Header photo={props?.photo} user={props?.user} />
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
      <Button
        className="community-container__main-box__item__body__btn"
        onClick={handleSubmit}
      >
        {props.text.find((e) => e?.TextContentId === 34)?.Translations}
      </Button>
    </div>
  );
};

export default React.memo(Main);
