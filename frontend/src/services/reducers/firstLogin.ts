import { FIRSTLOGIN_UPDATE_VALUE, FIRSTLOGIN_SET_ERROR } from "../types/redux";

export interface FirstLoginStateType {
  values: {
    mentorInfo: string | undefined;
    studentInfo: string | undefined;
  };
  errors: {
    mentorInfo: boolean | string;
    studentInfo: boolean | string;
  };
}

const initialState: FirstLoginStateType = {
  values: {
    mentorInfo: "",
    studentInfo: "",
  },
  errors: {
    mentorInfo: false,
    studentInfo: false,
  },
};

export interface FirstLoginAction {
  type: string;
  payload: any;
}

export default function (
  state = <FirstLoginStateType>initialState,
  action: FirstLoginAction
) {
  const { type, payload } = action;

  switch (type) {
    case FIRSTLOGIN_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case FIRSTLOGIN_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    default:
      return state;
  }
}
