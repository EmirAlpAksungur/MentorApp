import React from "react";
import { Button, Divider } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { TranslatedTextType } from "../../services/types/translations";
import { RootState } from "../../store/configureStore";
import ChatService from "../../services/api/chat";
import history from "../../routers/history";
interface UserType {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
}
export interface CardPropType {
  mentorInfo: string;
  studentInfo: string;
  user: UserType;
  text: TranslatedTextType[];
}

const Main: React.FC<CardPropType> = (props) => {
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
    } catch (err) {
      history.push("/chat");
    }
  };

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
