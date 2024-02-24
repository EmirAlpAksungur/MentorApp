import { instance, config } from "./baseUnit";

const startChat = (body: any, token: string) => {
  return instance.post("/chat/create/", body, config(token));
};

const loadChatListApi = (token: string) => {
  return instance.get("/chat/", config(token));
};

const ChatService = {
  startChat,
  loadChatListApi,
};

export default ChatService;
