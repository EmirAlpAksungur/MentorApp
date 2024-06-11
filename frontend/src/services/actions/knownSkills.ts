import { KNOWNSKILLS_SET_ERROR } from "../types/redux";
import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import { KnownSkillsType } from "../types/knownSkills";
const validationSchema = yup.object({
  knownSkills: yup.array().required("1667"),
});

export const aboutUpdate =
  (values: KnownSkillsType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState()?.auth?.token;
      let res = await ProfileService.updateSklls(values, token);
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
    const values = getState().knownSkills.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      return Promise.resolve(await dispatch(aboutUpdate(values)));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: KNOWNSKILLS_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
      return false;
    }
  };
