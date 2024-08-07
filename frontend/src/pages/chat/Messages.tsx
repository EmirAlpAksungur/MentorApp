import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatWebSocketClient } from "../../services/webSocket/chat";
import { MessageType } from "../../services/reducers/chat";
import { LoadingComponent } from "../../components";
import ChatService from "../../services/api/chat";
import "../../assets/pages/chat/chat.scss";
import { uuidv4 } from "../../utils/uuidGenerator";

const MessageBox: React.FC<{
  self: boolean;
  content: string;
  photo: string | null;
  photoVisible: boolean;
}> = ({ self, content, photo, photoVisible }) => {
  const userPhoto = useAppSelector(
    (state: RootState) => state.auth?.user?.photo
  );

  return self ? (
    <div className="chat-container__body__messages-box__self">
      <span
        className={`chat-container__body__messages-box__bubble chat-container__body__messages-box__bubble-self
         ${
           !photoVisible &&
           "chat-container__body__messages-box__bubble__right-margin"
         }
        `}
      >
        {content}
      </span>
      {photoVisible && (
        <Avatar src={`data:image/jpeg;base64,${userPhoto}`}></Avatar>
      )}
    </div>
  ) : (
    <span className="chat-container__body__messages-box__opposite">
      {photoVisible && (
        <Avatar src={`data:image/jpeg;base64,${photo}`}></Avatar>
      )}
      <span
        className={`chat-container__body__messages-box__bubble chat-container__body__messages-box__bubble-opposite
                ${
                  !photoVisible &&
                  "chat-container__body__messages-box__bubble__left-margin"
                }
        `}
      >
        {content}
      </span>
    </span>
  );
};

const LiveMessages: React.FC<{
  client: ChatWebSocketClient | null;
  photo: string | null;
  setRefresh: Function;
}> = React.memo(({ client, photo, setRefresh }) => {
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  const refreshChat = useAppSelector((state: RootState) => state.chat?.refresh);
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  useEffect(() => {
    client && setMessages(client.getMessages());
    setRefresh((prev: boolean) => {
      return !prev;
    });
  }, [client, refreshChat]);

  return (
    messages &&
    messages.map((e, index) => {
      const nextMessage =
        index < messages.length - 1 ? messages[index + 1] : null;
      return (
        <MessageBox
          key={e.id}
          self={e.contact === userId}
          content={e.content}
          photo={photo}
          photoVisible={nextMessage?.contact !== e.contact}
        />
      );
    })
  );
});

export const Messages: React.FC<{
  chatId: string;
  client: ChatWebSocketClient | null;
  photo: string | null;
}> = React.memo(({ chatId, client, photo }) => {
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [length, setLength] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [time, setTime] = useState<number>(Date.now());
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [refresh]);

  const fetchData = async () => {
    console.log("----");

    if (loading) return;
    try {
      setloading(true);
      let res = await ChatService.getPrevMessages(
        chatId,
        time,
        messages?.length / 30 + 1,
        token
      );

      setMessages((prev: MessageType[]) => {
        return [...res.data.data, ...prev];
      });
      setLength(res.data.length);
      return Promise.resolve(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  const fetchDataHelper = async () => {
    await fetchData();
  };
  useEffect(() => {
    fetchDataHelper();
  }, []);
  return (
    <Box className="chat-container__body__messages-box" id="scrollableDiv">
      <div ref={messagesEndRef} />
      <LiveMessages client={client} photo={photo} setRefresh={setRefresh} />
      {messages && (
        <InfiniteScroll
          key={Math.floor(Math.random() * (9999999 - 0 + 1))}
          dataLength={messages.length}
          next={fetchData}
          hasMore={messages.length < length}
          loader={
            <div style={{ width: "100%" }}>
              <LoadingComponent />
            </div>
          }
          scrollableTarget="scrollableDiv"
          inverse={true}
        >
          {messages &&
            messages.map((e, index) => {
              const nextMessage =
                index < messages.length - 1 ? messages[index + 1] : null;
              return (
                <MessageBox
                  key={uuidv4()}
                  self={e.contact === userId}
                  content={e.content}
                  photo={photo}
                  photoVisible={nextMessage?.contact !== e.contact}
                />
              );
            })}
        </InfiniteScroll>
      )}
    </Box>
  );
});
