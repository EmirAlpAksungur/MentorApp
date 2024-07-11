import React, { useState, useEffect } from "react";
import { Divider, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import "../../assets/pages/chat/chat.scss";
import { MyTextField } from "../../components";
import ChatListItem from "./ChatListItem";
import { ChatListType } from "../../services/reducers/chat";
const Main: React.FC = () => {
  const chatList = useAppSelector((state: RootState) => state.chat.chatList);
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeFunc = (val: any) => {
    setValue(val);
  };

  return (
    <div className="chat-container__chat-list">
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
      <Divider className="chat-container__chat-list__divider" />
      {chatList &&
        chatList.map((props: ChatListType) => (
          <ChatListItem
            id={props.id}
            last_message={props.last_message}
            participants={props.participants}
          />
        ))}
    </div>
  );
};

export default React.memo(Main);
