import { instance, config } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";
const startChat = (body: any, token: string) => {
  return instance.post("/chat/create/", body, config(token));
};

let cancelTokenHome: null | CancelTokenSource;

const getPrevMessages = (
  chatId: string,
  time: number,
  dataLen: number,
  token: string
) => {
  if (cancelTokenHome) {
    cancelTokenHome.cancel();
  }
  cancelTokenHome = axios.CancelToken.source();
  return instance.get(`/chat/prev-messages/${chatId}/${time}/${dataLen}/`, {
    ...config(token),
    cancelToken: cancelTokenHome.token,
  });
};

const loadChatListApi = (token: string) => {
  //remove
  return instance.get("/chat/", config(token));
};

const ChatService = {
  startChat,
  loadChatListApi,
  getPrevMessages,
};

export default ChatService;
