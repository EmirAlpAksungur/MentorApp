import { LOGIN_SET_ERROR, LOGIN_SUCCESS } from "../types/redux";

import * as yup from "yup";
import { Dispatch } from "redux";
import { RootState } from "../../store/configureStore";
import { LoginType } from "../types/login";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import history from "../../routers/history";
const validationSchema = yup.object({
  email: yup.string().email("14").required("15"),
  password: yup.string().required("16"),
});

const __loadUser =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      // let res = await ProfileService.login();
      // console.log(res);
    } catch (err: any) {
      // dispatch(
      //   changeNotification({
      //     NotificationCode: "error",
      //     NotificationText: parseInt(err.response.data.msg_code[0]),
      //   })
      // );
    }
  };

export const logIn = (values: LoginType) => async (dispatch: Dispatch) => {
  try {
    let res = await ProfileService.login(values);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    history.push("/");
  } catch (err: any) {
    dispatch(
      changeNotification({
        NotificationCode: "error",
        NotificationText: parseInt(err.response.data.msg_code[0]),
      })
    );
  }
};
export const handleSubmit =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const values = getState().login.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      await dispatch(logIn(values));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: LOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
