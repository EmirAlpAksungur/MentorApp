import { SIGNUP_SET_ERROR } from "../types/redux";

import * as yup from "yup";
import { Dispatch } from "redux";
import { RootState } from "../../store/configureStore";

const validationSchema = yup.object({
  Name: yup.string().required("12"),
  Surname: yup.string().required("13"),
  Eposta: yup.string().email("14").required("15"),
  Password: yup
    .string()
    .required("16")
    .min(8, "17")
    .matches(/^(?=.*[a-z])/, `18`)
    .matches(/^(?=.*[A-Z])/, `19`)
    .matches(/^(?=.*[0-9])/, `20`)
    .matches(/^(?=.*[!@.;'^+%&/()=?>£#$½{[}])/, `21`),
});

export const handleSubmit =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const values = getState().signup.values;
    console.log(values);
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      //   await dispatch(updateUserInfo(values));
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: SIGNUP_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
