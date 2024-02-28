import { SIGNUP_SET_ERROR, CLEAN_SIGNUP_FORM } from "../types/redux";

import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
import { changeNotification } from "./notification";
import { logIn } from "./login";
const validationSchema = yup.object({
  first_name: yup.string().required("12"),
  last_name: yup.string().required("13"),
  email: yup.string().email("14").required("15"),
  password: yup
    .string()
    .required("16")
    .min(8, "17")
    .matches(/^(?=.*[a-z])/, `18`)
    .matches(/^(?=.*[A-Z])/, `19`)
    .matches(/^(?=.*[0-9])/, `20`)
    .matches(/^(?=.*[!@.;'^+%&/()=?>£#$½{[}])/, `21`),
});

const _signUp: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().signup.values;
    try {
      let res = await ProfileService.register(values);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: 24,
        })
      );
      dispatch(
        logIn({
          email: values.email,
          password: values.password,
        })
      );
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
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().signup.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      dispatch(_signUp());
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: SIGNUP_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };

export const cleanSignUpForm = () => (dispatch: AppDispatch) => {
  dispatch({
    type: CLEAN_SIGNUP_FORM,
  });
};
