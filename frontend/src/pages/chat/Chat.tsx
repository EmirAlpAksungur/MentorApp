import React, { useEffect, useState } from "react";
import { Grid, Divider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { ChatWebSocketClient } from "../../services/webSocket/chat";
import "../../assets/pages/chat/chat.scss";
import { refreshChat } from "../../services/actions/chat";
const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);

  const chatId = useAppSelector((state: RootState) => state.chat?.selectedChat);
  const last_message = useAppSelector((state: RootState) => {
    return state.chat?.chatList?.find((e: any) => e.id === chatId)
      ?.last_message;
  });
  const [client, setClient] = useState<ChatWebSocketClient | null>(null);
  useEffect(() => {
    let ws: ChatWebSocketClient | null = null;
    if (chatId) {
      const refreshFunc = () => {
        dispatch(refreshChat());
      };
      ws = new ChatWebSocketClient(userId, chatId, refreshFunc, last_message);
      setClient(ws);
      ws.openWs();
    }
    return () => {
      if (ws) ws.closeWs();
    };
  }, [chatId]);
  return (
    <Grid
      container
      className="chat-container__body"
      flexDirection={"column-reverse"}
    >
      <Grid item>
        <SendMessage client={client} />
      </Grid>
      <Divider className="chat-container__body__divider" />
      <Grid item>
        <Messages client={client} />
      </Grid>
    </Grid>
  );
};

export default React.memo(Chat);
