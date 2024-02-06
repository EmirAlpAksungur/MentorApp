import { LOGIN_SUCCESS } from "../types/redux";

export interface AuthStateType {
  token: string | null;
  isAuthenticated: boolean;
  user: Object | null;
}

const initialState: AuthStateType = {
  token: null,
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
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
      };
    }
    default:
      return state;
  }
}
