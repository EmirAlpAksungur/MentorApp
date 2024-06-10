import {
  PERSONALINFO_UPDATE_VALUE,
  PERSONALINFO_SET_ERROR,
  CLEAN_PERSONALINFO_FORM,
  PERSONALINFO_FILL_VALUE,
} from "../types/redux";

export interface PersonalInfoStateType {
  values: {
    dateOfBirth: number | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profession: string | null;
    location: number | null;
    nationality: number | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  };
  errors: {
    dateOfBirth: boolean | string;
    email: boolean | string;
    first_name: boolean | string;
    last_name: boolean | string;
    profession: boolean | string;
    location: boolean | string;
    nationality: boolean | string;
    github: boolean | string;
    linkedin: boolean | string;
    twitter: boolean | string;
  };
}

const initialState: PersonalInfoStateType = {
  values: {
    dateOfBirth: 0,
    email: "",
    first_name: "",
    last_name: "",
    profession: "",
    location: null,
    nationality: null,
    github: "",
    linkedin: "",
    twitter: "",
  },
  errors: {
    dateOfBirth: false,
    email: false,
    first_name: false,
    last_name: false,
    profession: false,
    location: false,
    nationality: false,
    github: false,
    linkedin: false,
    twitter: false,
  },
};

export interface PersonalInfoAction {
  type: string;
  payload: any;
}

export default function (
  state = <PersonalInfoStateType>initialState,
  action: PersonalInfoAction
) {
  const { type, payload } = action;

  switch (type) {
    case PERSONALINFO_FILL_VALUE:
      return {
        ...state,
        values: payload,
      };
    case PERSONALINFO_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case PERSONALINFO_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_PERSONALINFO_FORM:
      return initialState;
    default:
      return state;
  }
}
