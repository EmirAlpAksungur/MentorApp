import { FIRSTLOGIN_UPDATE_VALUE, FIRSTLOGIN_SET_ERROR } from "../types/redux";
import {
  LanguagesType,
  CertificateType,
  KnownSkillsType,
  UnKnownSkillsType,
} from "../types/firstLogin";
export interface FirstLoginStateType {
  values: {
    photo: Blob | null;
    about: string | undefined;
    location: number | undefined;
    university: number[] | undefined;
    languages: LanguagesType[] | undefined;
    certificate: CertificateType[] | undefined;
    knownSkills: KnownSkillsType[] | undefined;
    unKnownSkills: UnKnownSkillsType[] | undefined;
  };
  errors: {
    photo: string | boolean;
    about: string | boolean;
    location: string | boolean;
    university: string | boolean;
    languages: string | boolean;
    certificate: string | boolean;
    knownSkills: string | boolean;
    unKnownSkills: string | boolean;
  };
}

const initialState: FirstLoginStateType = {
  values: {
    photo: null,
    about: undefined,
    location: undefined,
    university: undefined,
    languages: undefined,
    certificate: undefined,
    knownSkills: undefined,
    unKnownSkills: undefined,
  },
  errors: {
    photo: false,
    about: false,
    location: false,
    university: false,
    languages: false,
    certificate: false,
    knownSkills: false,
    unKnownSkills: false,
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
