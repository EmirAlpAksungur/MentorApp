import { SIGNUP_UPDATE_VALUE, SIGNUP_SET_ERROR } from "../types/redux";

export interface SignUpStateType {
  values: {
    Name: string | undefined;
    Surname: string | undefined;
    Eposta: string | undefined;
    Password: string | undefined;
  };
  errors: {
    Name: boolean | string;
    Surname: boolean | string;
    Eposta: boolean | string;
    Password: boolean | string;
  };
}

const initialState: SignUpStateType = {
  values: {
    Name: "",
    Surname: "",
    Eposta: "",
    Password: "",
  },
  errors: {
    Name: false,
    Surname: false,
    Eposta: false,
    Password: false,
  },
};

export interface SignUpAction {
  type: string;
  payload: any;
}

export default function (
  state = <SignUpStateType>initialState,
  action: SignUpAction
) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case SIGNUP_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    default:
      return state;
  }
}
