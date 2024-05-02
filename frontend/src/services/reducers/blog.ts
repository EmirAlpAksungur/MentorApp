import {
  BLOG_UPDATE_VALUE,
  BLOG_SET_ERROR,
  CHANGE_BLOG_PAGE,
} from "../types/redux";

export interface BlogStateType {
  page: boolean;
  values: {
    uuid: string | undefined;
    photo: Blob | null;
    blog: string | undefined;
    title: string | undefined;
    summary: string | undefined;
  };
  errors: {
    photo: string | boolean;
    blog: string | boolean;
    title: string | boolean;
    summary: string | boolean;
  };
}

const initialState: BlogStateType = {
  page: true,
  values: {
    uuid: undefined,
    photo: null,
    blog: undefined,
    title: undefined,
    summary: undefined,
  },
  errors: {
    photo: false,
    blog: false,
    title: false,
    summary: false,
  },
};

export interface BlogAction {
  type: string;
  payload: any;
}

export default function (
  state = <BlogStateType>initialState,
  action: BlogAction
) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case BLOG_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case BLOG_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CHANGE_BLOG_PAGE:
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
}
