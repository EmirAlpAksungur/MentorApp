import {
  LOGIN_SET_ERROR,
  LOGIN_SUCCESS,
  LOAD_USER,
  CLEAN_AUTH,
  CLEAN_LOGIN_FORM,
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

export const loadUser =
  (token: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      let res = await ProfileService.getUser(token);
      console.log(res);

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const addToken =
  (payload: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload,
    });
    return true;
  };
export const logIn = (values: LoginType) => async (dispatch: AppDispatch) => {
  try {
    let res = await ProfileService.login(values);
    dispatch(loadUser(res.data.key));
    dispatch(addToken(res.data.key));
    history.push("/");
    return Promise.resolve(res.data.key);
  } catch (err: any) {
    dispatch(
      changeNotification({
        NotificationCode: "error",
        NotificationText: parseInt(err.response.data.msg_code[0]),
      })
    );
    return null;
  }
};

export const checkIsAuth =
  (token: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await ProfileService.isAuth(token);
      return true;
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
      localStorage.removeItem("token");
      return false;
    }
  };

export const handleSubmit =
  (keepLoggedIn: boolean) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().login.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      let token = await dispatch(logIn(values));
      token && keepLoggedIn && localStorage.setItem("token", token);
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: LOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };

export const cleanLoginForm = () => (dispatch: AppDispatch) => {
  dispatch({
    type: CLEAN_LOGIN_FORM,
  });
};
