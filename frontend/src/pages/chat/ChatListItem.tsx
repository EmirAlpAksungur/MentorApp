import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import { Avatar, Grid } from "@mui/material";
import { ChatListType } from "../../services/reducers/chat";
import { changeSelectedChat } from "../../services/actions/chat";
import "../../assets/pages/chat/chat.scss";
const Main: React.FC<ChatListType> = ({ id, messages, participants }) => {
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  const dispatch = useAppDispatch();
  return (
    <div
      className="chat-container__chat-list__item"
      onClick={() => {
        dispatch(changeSelectedChat(id));
      }}
    >
      <Grid container alignItems={"center"}>
        <Grid item>
          <Avatar />
        </Grid>

        <Grid item className="chat-container__chat-list__item__name">
          {participants.find((e) => e.id != userId)!.first_name}{" "}
          {participants.find((e) => e.id != userId)!.last_name}
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
