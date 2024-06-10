import { PERSONALINFO_SET_ERROR } from "../types/redux";
import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import { PersonalInfoType } from "../types/personalInfo";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";

const validationSchema = yup.object({
  first_name: yup.string().required("12"),
  last_name: yup.string().required("13"),
  email: yup.string().email("14").required("15"),
  dateOfBirth: yup.number().nullable(),
  profession: yup.string().max(100, "1669"),
  location: yup.number().required("1667"),
  nationality: yup.number().required("1667"),
  github: yup.string().nullable(),
  linkedin: yup.string().nullable(),
  twitter: yup.string().nullable(),
});

export const personalInfoUpdate =
  (values: PersonalInfoType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState()?.auth?.token;
      let res = await ProfileService.updatePersonalInfo(values, token);
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
    const values = getState().personalInfo.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      return Promise.resolve(await dispatch(personalInfoUpdate(values)));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: PERSONALINFO_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
      return false;
    }
  };
