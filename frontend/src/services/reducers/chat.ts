import {
  UPDATE_CHAT_LIST,
  CHANGE_SELECTED_CHAT,
  REFRESH_CHAT,
} from "../types/redux";

interface ParticipantsType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profil: {
    photo: string | null;
  };
}

export interface MessageType {
  contact: number;
  content: string;
  id: number;
  is_delivered: boolean;
  is_read: boolean;
  is_sent: boolean;
  timestamp: number;
}

export interface ChatListType {
  id: string;
  last_message: MessageType;
  participants: ParticipantsType[];
}

export interface ChatStateType {
  chatList: ChatListType[] | null;
  selectedChat: string | null;
  refresh: boolean;
}

const initialState: ChatStateType = {
  chatList: null,
  selectedChat: null,
  refresh: false,
};

export interface ChatAction {
  type: string;
  payload: any;
}

export default function (
  state = <ChatStateType>initialState,
  action: ChatAction
) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_SELECTED_CHAT:
      return { ...state, selectedChat: payload };
    case UPDATE_CHAT_LIST:
      return { ...state, chatList: payload };
    case REFRESH_CHAT:
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
}
