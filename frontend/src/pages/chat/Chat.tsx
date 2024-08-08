import React, { useEffect, useState } from "react";
import { Grid, Divider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SendMessage from "./SendMessage";
import { Messages } from "./Messages";
import { ChatWebSocketClient } from "../../services/webSocket/chat";
import "../../assets/pages/chat/chat.scss";
import { refreshChat } from "../../services/actions/chat";
import ChatHeader from "./ChatHeader";
const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);

  const chatId = useAppSelector((state: RootState) => state.chat?.selectedChat);
  const photo = useAppSelector((state: RootState) => {
    return state.chat?.chatList
      ?.find((a: any) => a?.id === chatId)
      ?.participants?.find((e: any) => e.id !== userId)?.profil?.photo;
  });
  const user_id = useAppSelector((state: RootState) => {
    return state.chat?.chatList
      ?.find((a: any) => a?.id === chatId)
      ?.participants?.find((e: any) => e.id !== userId)?.id;
  });
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
  return client ? (
    <>
      <ChatHeader user_id={user_id} />
      <Grid
        container
        className="chat-container__body"
        flexDirection={"column-reverse"}
      >
        <Grid item>
          <SendMessage client={client} />
        </Grid>
        <Divider className="chat-container__body__divider" />
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Messages chatId={chatId} client={client} photo={photo} />
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  );
};

export default React.memo(Chat);
