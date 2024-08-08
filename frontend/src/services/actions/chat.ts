import {
  UPDATE_CHAT_LIST,
  CHANGE_SELECTED_CHAT,
  REFRESH_CHAT,
} from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import ChatService from "../api/chat";
import history from "../../routers/history";
export const loadChatList =
  (data: any | null) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      data &&
        dispatch({
          type: UPDATE_CHAT_LIST,
          payload: data,
        });
    } catch (err) {
      console.log(err);
    }
  };

export const changeSelectedChat =
  (chatId: string | null) => async (dispatch: AppDispatch) => {
    dispatch({
      type: CHANGE_SELECTED_CHAT,
      payload: chatId,
    });
  };

export const refreshChat = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: REFRESH_CHAT,
  });
};

export const sendMessage =
  (sender: number, receiver: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let chatId = "";
    const token = getState().auth.token;
    sender > receiver
      ? (chatId = receiver.toString() + "_" + sender.toString())
      : (chatId = sender.toString() + "_" + receiver.toString());

    try {
      const body = {
        id: chatId,
        participants: [sender, receiver],
        messages: [],
      };

      let res = await ChatService.startChat(body, token);
      history.push("/chat");
      dispatch(changeSelectedChat(chatId));
    } catch (err) {
      history.push("/chat");
      dispatch(changeSelectedChat(chatId));
    }
  };
