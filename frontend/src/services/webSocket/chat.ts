import { wsBaseUrl } from "../api/baseUnit";
import { MessageType } from "../reducers/chat";
const W3CWebSocket = require("websocket").w3cwebsocket;

export class ChatWebSocketClient {
  private client: any;
  private userId: number;
  private chatId: string;
  private last_message: MessageType;
  private messages: MessageType[];
  private refreshChat: Function;

  constructor(
    userId: number,
    chatId: string,
    refreshChat: Function,
    last_message: MessageType
  ) {
    this.userId = userId;
    this.chatId = chatId;
    this.last_message = last_message;
    this.messages = [];
    this.refreshChat = refreshChat;
  }

  openWs = (): void => {
    this.client = new W3CWebSocket(`${wsBaseUrl}/ws/chat/${this.chatId}/`);

    this.client.onerror = (): void => {
      console.log("Connection Error");
    };
    const is_read = (message_id: number, contact: number) => {
      if (this.userId !== contact) {
        this.client.send(
          JSON.stringify({
            command: "message_readed",
            message: message_id,
            chat_id: this.chatId,
          })
        );
      }
    };
    this.client.onopen = (): void => {
      is_read(this.last_message.id, this.last_message.contact);
      console.log("WebSocket Client Connected");
    };

    this.client.onclose = (): void => {
      console.log("WebSocket Client Closed");
    };

    const new_message = (data: any) => {
      this.messages = [...this.messages, data.message];
    };

    this.client.onmessage = (e: MessageEvent): void => {
      const sendNumber = (): void => {
        if (this.client.readyState === this.client.OPEN) {
          let data = JSON.parse(e.data);
          switch (data?.command) {
            case "new_message":
              is_read(data.message.id, data.message.contact);
              new_message(data);
              break;
            default:
              break;
          }

          this.refreshChat();
        }
      };
      sendNumber();
    };
  };

  closeWs = (): void => {
    if (this.client) this.client.close();
  };

  sendMessage = (msg: string, fromId: number): void => {
    const msgObject = {
      command: "new_message",
      from: fromId,
      message: msg,
      chatId: this.chatId,
    };
    this.client.send(JSON.stringify(msgObject));
  };

  getMessages = (): MessageType[] => {
    return this.messages;
  };
}
