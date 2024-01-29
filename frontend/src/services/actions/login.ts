import { LOGIN_SET_ERROR } from "../types/redux";

import * as yup from "yup";
import { Dispatch } from "redux";
import { RootState } from "../../store/configureStore";

const validationSchema = yup.object({
  Eposta: yup.string().email("14").required("15"),
  Password: yup.string().required("16"),
});

export const handleSubmit =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const values = getState().login.values;
    console.log(values);
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      //   await dispatch(updateUserInfo(values));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: LOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
