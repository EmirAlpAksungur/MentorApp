import {
  UNKNOWNSKILLS_UPDATE_VALUE,
  UNKNOWNSKILLS_SET_ERROR,
  CLEAN_UNKNOWNSKILLS_FORM,
} from "../types/redux";
import { UnKnownSkillsType } from "../types/unKnownSkills";
export interface UnKnownSkillsStateType {
  values: {
    unKnownSkills: UnKnownSkillsType[] | undefined;
  };
  errors: {
    unKnownSkills: boolean | string;
  };
}

const initialState: UnKnownSkillsStateType = {
  values: {
    unKnownSkills: [],
  },
  errors: {
    unKnownSkills: false,
  },
};

export interface UnKnownSKillsAction {
  type: string;
  payload: any;
}

export default function (
  state = <UnKnownSkillsStateType>initialState,
  action: UnKnownSKillsAction
) {
  const { type, payload } = action;

  switch (type) {
    case UNKNOWNSKILLS_UPDATE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [payload.key]: payload.value,
        },
        errors: { ...state.errors, [payload.key]: false },
      };
    case UNKNOWNSKILLS_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_UNKNOWNSKILLS_FORM:
      return initialState;
    default:
      return state;
  }
}
