import {
  LOGIN_SET_ERROR,
  LOGIN_SUCCESS,
  LOAD_USER,
  CLEAN_AUTH,
} from "../types/redux";
import * as yup from "yup";
import { Dispatch } from "redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import { LoginType } from "../types/login";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import history from "../../routers/history";
const validationSchema = yup.object({
  email: yup.string().email("14").required("15"),
  password: yup.string().required("16"),
});

const __loadUser =
  (token: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      let res = await ProfileService.getUser(token);
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const logIn = (values: LoginType) => async (dispatch: AppDispatch) => {
  try {
    let res = await ProfileService.login(values);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.key,
    });
    dispatch(__loadUser(res.data.key));
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
export const checkIsAuth =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      if (token) {
        await ProfileService.isAuth(token);
      }
    } catch (err: any) {
      dispatch(
        changeNotification({
          NotificationCode: "error",
          NotificationText: 37,
        })
      );
      dispatch({
        type: CLEAN_AUTH,
      });
    }
  };

export const handleSubmit =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().login.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      dispatch(logIn(values));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: LOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
