import { CHANGE_NOTIFICATION } from "../types/redux";

import { Dispatch } from "redux";

import { NotificationStateType } from "../reducers/notification";

export const changeNotification =
  (payload: NotificationStateType) => (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_NOTIFICATION,
      payload,
    });
  };
