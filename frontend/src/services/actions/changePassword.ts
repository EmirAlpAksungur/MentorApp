import {
  CHANGEPASSWORD_SET_ERROR,
  CLEAN_CHANGEPASSWORD_FORM,
} from "../types/redux";
import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import { changeNotification } from "./notification";
import ProfileService from "../api/profile";
import { logOut } from "./auth";
const validationSchema = yup.object({
  oldPassword: yup.string().required("16"),
  newPassword: yup
    .string()
    .required("16")
    .min(8, "17")
    .matches(/^(?=.*[a-z])/, `18`)
    .matches(/^(?=.*[A-Z])/, `19`)
    .matches(/^(?=.*[0-9])/, `20`)
    .matches(/^(?=.*[!@.;'^+%&/()=?>£#$½{[}])/, `21`),
  confirmPassword: yup
    .string()
    .required("16")
    .oneOf([yup.ref("newPassword")], "1651"),
});
export const cleanChangepass =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: CLEAN_CHANGEPASSWORD_FORM });
  };
const _changePass: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().changePassword.values;
    const token = getState().auth.token;
    try {
      let res = await ProfileService.changePass(values, token);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: 1652,
        })
      );
      dispatch(logOut());
      dispatch(cleanChangepass());
    } catch (err: any) {
      console.log(err);

      dispatch(
        changeNotification({
          NotificationCode: "error",
          NotificationText: parseInt(err?.response?.data?.oldPassword?.[0]),
        })
      );
    }
  };
export const handleSubmit =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().changePassword.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      dispatch(_changePass());
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: CHANGEPASSWORD_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
