import { wsBaseUrl } from "../api/baseUnit";
import { MessageType } from "../reducers/chat";
const W3CWebSocket = require("websocket").w3cwebsocket;

export interface chatType {
  id: number;
  participants: number;
  last_message: MessageType;
}

export class AllChatWebSocketClient {
  private client: any;
  private userId: number;
  private chats: chatType[];
  private refreshChat: Function;

  constructor(userId: number, refreshChat: Function) {
    this.userId = userId;
    this.chats = [];
    this.refreshChat = refreshChat;
  }

  openWs = (current_user: boolean): void => {
    this.client = new W3CWebSocket(`${wsBaseUrl}/ws/chat_all/${this.userId}/`);

    this.client.onerror = (): void => {
      console.log("Connection Error");
    };

    this.client.onopen = (): void => {
      current_user && this.allChats();
      console.log("WebSocket Client Connected");
    };

    this.client.onclose = (): void => {
      console.log("WebSocket Client Closed");
    };

    const fetch_chats = (data: any) => {
      let chats = [...this.chats, ...data.data];
      this.chats = chats;
      return chats;
    };
    const first_message = (data: any) => {
      console.log(data);

      let chats = [...this.chats, data];
      this.chats = chats;
      return chats;
    };

    const message_delivered = (chat_id: string, last_message: MessageType) => {
      if (
        this.userId !== last_message?.contact &&
        !last_message?.is_delivered
      ) {
        this.client.send(
          JSON.stringify({
            command: "message_delivered",
            message: last_message?.id,
            chat_id,
          })
        );
      }
    };

    const last_message = (data: any) => {
      let chats = this.chats.map((e) => {
        if (e.id === data.chat_id) {
          return {
            ...e,
            last_message: data.message,
          };
        }
        return e;
      });
      this.chats = chats;

      return chats;
    };

    this.client.onmessage = (e: MessageEvent): void => {
      const sendNumber = (): void => {
        if (this.client.readyState === this.client.OPEN) {
          let data = JSON.parse(e.data);

          switch (data?.command) {
            case "fetch_chats":
              const chats = fetch_chats(data);
              this.refreshChat(chats);
              chats.map((e) => {
                message_delivered(e.id, e.last_message);
              });
              break;

            case "last_message":
              message_delivered(data.chat_id, data.message);
              this.refreshChat(last_message(data));
              break;

            case "message_delivered":
              this.refreshChat(last_message(data));
              break;
            case "message_readed":
              this.refreshChat(last_message(data));
              break;
            case "first_message":
              this.refreshChat(first_message(data?.message));
              break;
            default:
              break;
          }
        }
      };
      sendNumber();
    };
  };

  closeWs = (): void => {
    if (this.client) this.client.close();
  };

  allChats = (): boolean => {
    const msgObject = {
      command: "fetch_chats",
      user_id: this.userId,
    };
    this.client.send(JSON.stringify(msgObject));
    return true;
  };

  getChats = (): chatType[] => {
    return this.chats;
  };
}
