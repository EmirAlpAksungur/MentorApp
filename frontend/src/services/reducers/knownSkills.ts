import {
  KNOWNSKILLS_UPDATE_VALUE,
  KNOWNSKILLS_SET_ERROR,
  CLEAN_KNOWNSKILLS_FORM,
} from "../types/redux";

export interface KnownSkillsStateType {
  values: {
    knownSkills: number[] | undefined;
  };
  errors: {
    knownSkills: boolean | string;
  };
}

const initialState: KnownSkillsStateType = {
  values: {
    knownSkills: [],
  },
  errors: {
    knownSkills: false,
  },
};

export interface KnownSKillsAction {
  type: string;
  payload: any;
}

export default function (
  state = <KnownSkillsStateType>initialState,
  action: KnownSKillsAction
) {
  const { type, payload } = action;

  switch (type) {
    case KNOWNSKILLS_UPDATE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [payload.key]: Array.from(new Set(payload.value)),
        },
        errors: { ...state.errors, [payload.key]: false },
      };
    case KNOWNSKILLS_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_KNOWNSKILLS_FORM:
      return initialState;
    default:
      return state;
  }
}
