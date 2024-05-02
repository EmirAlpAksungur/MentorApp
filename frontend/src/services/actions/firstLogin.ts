import { FIRSTLOGIN_SET_ERROR, UPDATE_USER } from "../types/redux";

import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
import { loadUser } from "./login";
const validationSchema = yup.object({
  // mentorInfo: yup.string().required("32").min(50, "33").max(300, "33"),
  // studentInfo: yup.string().required("32").min(50, "33").max(300, "33"),
});

const _fillProfile: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().firstLogin.values;
    const token = getState().auth.token;
    try {
      var formData = new FormData();
      Object.keys(values).map((e: string) => {
        console.log(e);

        if (e === "languages") {
          console.log("languages");
          values?.[e] &&
            formData.append(
              e,
              `[${values?.[e].map(function (
                lang: { level: number; name: string; uuid: string },
                index: Number
              ) {
                return `{"level":"${lang.level}","name":"${lang.name}","uuid":"${lang.uuid}"}`;
              })}]`
            );
        } else if (e === "certificate") {
          console.log("certificate");
          values?.[e] &&
            formData.append(
              e,
              `[${values?.[e].map(function (
                certificate: { comment: string; image: Blob; uuid: string },
                index: Number
              ) {
                return `{"comment":"${certificate.comment}","image":"${certificate.image}","uuid":"${certificate.uuid}"}`;
              })}]`
            );
        } else if (e === "unKnownSkills") {
          values?.[e] &&
            formData.append(
              e,
              `${values?.[e].map(function (
                lang: { level: number; skill: number },
                index: Number
              ) {
                return `{"level":"${lang.level}","skill":"${lang.skill}"}`;
              })}`
            );
        } else formData.append(e, values[e]);
      });
      console.log(formData.entries());
      console.log(values);

      await ProfileService.fillProfile(formData, token);
      dispatch({
        type: UPDATE_USER,
        payload: {
          key: "isFilled",
          value: true,
        },
      });
      dispatch(loadUser(token));
    } catch (err: any) {
      console.log(err);
    }
  };

export const handleSubmit =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().firstLogin.values;
    try {
      await validationSchema.validate(values, {
        abortEarly: false,
        strict: false,
      });
      dispatch(_fillProfile());
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        dispatch({
          type: FIRSTLOGIN_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };
