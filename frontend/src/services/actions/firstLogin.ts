import { FIRSTLOGIN_SET_ERROR, UPDATE_USER } from "../types/redux";

import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
const validationSchema = yup.object({
  mentorInfo: yup.string().required("32").min(50, "33").max(300, "33"),
  studentInfo: yup.string().required("32").min(50, "33").max(300, "33"),
});

const _fillProfile: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().firstLogin.values;
    const token = getState().auth.token;
    try {
      await ProfileService.fillProfile(values, token);
      dispatch({
        type: UPDATE_USER,
        payload: {
          key: "isFilled",
          value: true,
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const handleSubmit =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().firstLogin.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      dispatch(_fillProfile());
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: FIRSTLOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
