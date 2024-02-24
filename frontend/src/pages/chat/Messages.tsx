import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import { ChatWebSocketClient } from "../../services/webSocket/chat";
import { messageType } from "../../services/webSocket/chat";
import "../../assets/pages/chat/chat.scss";
interface MessagesType {
  client: ChatWebSocketClient | null;
}
const Messages: React.FC<MessagesType> = ({ client }) => {
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  const refreshChat = useAppSelector((state: RootState) => state.chat?.refresh);
  const [messages, setMessages] = useState<messageType[] | null>(null);

  React.useEffect(() => {
    client && setMessages(client.getMessages());
  }, [refreshChat]);
  return (
    <Grid
      container
      flexDirection={"column"}
      className="chat-container__body__messages-box"
    >
      {messages &&
        messages.map((e) => {
          return e.author === userId ? (
            <span className="chat-container__body__messages-box__bubble chat-container__body__messages-box__bubble-self">
              {e.content}
            </span>
          ) : (
            <span className="chat-container__body__messages-box__bubble chat-container__body__messages-box__bubble-opposite">
              {e.content}
            </span>
          );
        })}
    </Grid>
  );
};

export default React.memo(Messages);
