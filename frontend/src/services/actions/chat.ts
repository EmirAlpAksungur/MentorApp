import {
  UPDATE_CHAT_LIST,
  CHANGE_SELECTED_CHAT,
  REFRESH_CHAT,
} from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import ChatService from "../api/chat";
export const loadChatList =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      let res = await ChatService.loadChatListApi(token);
      console.log(res);
      dispatch({
        type: UPDATE_CHAT_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const changeSelectedChat =
  (chatId: string) => async (dispatch: AppDispatch) => {
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
