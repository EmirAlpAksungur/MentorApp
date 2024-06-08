import { ABOUT_SET_ERROR } from "../types/redux";
import * as yup from "yup";
import { Dispatch } from "redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import { AboutType } from "../types/about";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import history from "../../routers/history";

const validationSchema = yup.object({
  about: yup.string().required("1667"),
});

export const aboutUpdate =
  (values: AboutType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState()?.auth?.token;
      let res = await ProfileService.aboutUpdate(values, token);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: 1668,
        })
      );
      return Promise.resolve(true);
    } catch (err: any) {
      dispatch(
        changeNotification({
          NotificationCode: "error",
          NotificationText: 1640,
        })
      );
      return Promise.resolve(false);
    }
  };

export const handleSubmit =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().about.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      return Promise.resolve(await dispatch(aboutUpdate(values)));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: ABOUT_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
      return false;
    }
  };
