import React, { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";

import Messages from "./Messages";
import { MyTextField } from "../../../components";
import ChatListItem from "./ChatListItem";
import { ChatListType } from "../../../services/reducers/chat";
import "../../../assets/pages/chat/chat.scss";

const Main: React.FC = () => {
  const chatList = useAppSelector((state: RootState) => state.chat.chatList);
  const [value, setValue] = useState("");

  const handleChangeFunc = (val: any) => {
    setValue(val);
  };

  return (
    <div className="chat-container__chat-list">
      <div className="chat-container__chat-list__messages">
        <Messages />
      </div>
      <div className="chat-container__chat-list__search">
        <MyTextField
          handleChangeFunc={handleChangeFunc}
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon className="end-adorment" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {chatList &&
        chatList.map(
          (props: ChatListType) =>
            props.last_message && (
              <ChatListItem
                key={props.id}
                id={props.id}
                last_message={props.last_message}
                participants={props.participants}
              />
            )
        )}
    </div>
  );
};

export default React.memo(Main);
