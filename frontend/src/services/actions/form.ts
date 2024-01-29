import { Dispatch } from "redux";

export const updateFormValue =
  (type: string, key: string, value: any) => (dispatch: Dispatch) => {
    console.log({
      type: type.toUpperCase() + "_UPDATE_VALUE",
      payload: {
        key,
        value,
      },
    });

    dispatch({
      type: type.toUpperCase() + "_UPDATE_VALUE",
      payload: {
        key,
        value,
      },
    });
  };
