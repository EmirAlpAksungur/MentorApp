import { CHANGE_TEXT } from "../types/redux";

export interface AuthStateType {
  token: string | null;
  isAuthenticated: boolean;
  user: Object | null;
}

const initialState: AuthStateType = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

interface action {
  type: string;
  payload: AuthStateType;
}

export default function (state = <AuthStateType>initialState, action: action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TEXT: {
      return {
        ...state,
        token: payload,
      };
    }
    default:
      return state;
  }
}
