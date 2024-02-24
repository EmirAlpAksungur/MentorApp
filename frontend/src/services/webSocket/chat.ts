import { wsBaseUrl } from "../api/baseUnit";
const W3CWebSocket = require("websocket").w3cwebsocket;

export interface messageType {
  id: number;
  author: number;
  content: string;
  timestamp: string;
}

export class ChatWebSocketClient {
  private client: any;
  private chatId: string;
  private messages: messageType[];
  private refreshChat: Function;

  constructor(chatId: string, refreshChat: Function) {
    this.chatId = chatId;
    this.messages = [];
    this.refreshChat = refreshChat;
  }

  openWs = (): void => {
    this.client = new W3CWebSocket(`${wsBaseUrl}/ws/chat/${this.chatId}/`);

    this.client.onerror = (): void => {
      console.log("Connection Error");
    };

    this.client.onopen = (): void => {
      console.log("WebSocket Client Connected");
    };

    this.client.onclose = (): void => {
      console.log("WebSocket Client Closed");
    };

    this.client.onmessage = (e: MessageEvent): void => {
      const sendNumber = (): void => {
        if (this.client.readyState === this.client.OPEN) {
          let data = JSON.parse(e.data);
          this.messages = [...this.messages, data.message];
          console.log(this.messages);
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

  getMessages = (): messageType[] => {
    return this.messages;
  };
}
