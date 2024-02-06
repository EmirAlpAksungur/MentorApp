import { CHANGE_NOTIFICATION } from "../types/redux";

export interface NotificationStateType {
  NotificationText: Boolean | Number;
  NotificationCode: Boolean | String;
}

const initialState: NotificationStateType = {
  NotificationText: false,
  NotificationCode: false,
};

export interface NotificationAction {
  type: string;
  payload: NotificationStateType;
}

export default function (
  state = <NotificationStateType>initialState,
  action: NotificationAction
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_NOTIFICATION: {
      return {
        NotificationText: payload.NotificationText,
        NotificationCode: payload.NotificationCode,
      };
    }
    default:
      return state;
  }
}
