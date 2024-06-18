import { PROFILELANGUAGES_SET_ERROR } from "../types/redux";
import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import { LanguagesTypes } from "../types/languages";
const validationSchema = yup.object({
  languages: yup.array().required("1667"),
});

export const languagesUpdate =
  (values: LanguagesTypes) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState()?.auth?.token;
      let res = await ProfileService.updateProfileLanguages(values, token);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: 1668,
        })
      );
      return Promise.resolve(true);
    } catch (err: any) {
      console.log(err);

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
    const values = getState().profileLanguages.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      return Promise.resolve(await dispatch(languagesUpdate(values)));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: PROFILELANGUAGES_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
      return false;
    }
  };
