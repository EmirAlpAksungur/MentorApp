import { BLOG_SET_ERROR, CHANGE_BLOG_PAGE } from "../types/redux";

import * as yup from "yup";
import { RootState, AppDispatch } from "../../store/configureStore";
import BlogService from "../api/blog";
import { updateFormValue } from "./form";
import { BlogType } from "../types/blog";
const validationSchema = yup.object({
  // mentorInfo: yup.string().required("32").min(50, "33").max(300, "33"),
  // studentInfo: yup.string().required("32").min(50, "33").max(300, "33"),
});

const _fillProfile: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const values = getState().blog.values;
    const token = getState().auth.token;
    try {
      console.log(values);

      var formData = new FormData();
      Object.keys(values).map((e: string) => {
        formData.append(e, values[e]);
      });

      await BlogService.create(formData, token);
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
          type: BLOG_SET_ERROR,
          payload: { key: error.path, value: parseInt(error.message) },
        });
      });
    }
  };

export const handleNew =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateFormValue("BLOG", "uuid", undefined));
    dispatch(updateFormValue("BLOG", "photo", null));
    dispatch(updateFormValue("BLOG", "blog", undefined));
    dispatch(updateFormValue("BLOG", "title", undefined));
    dispatch(updateFormValue("BLOG", "summary", undefined));
    dispatch(pageChange(true));
  };

export const handleBlogUpdate =
  (blog: BlogType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateFormValue("BLOG", "uuid", blog.uuid));
    dispatch(updateFormValue("BLOG", "photo", blog.photo));
    dispatch(updateFormValue("BLOG", "blog", blog.blog));
    dispatch(updateFormValue("BLOG", "title", blog.title));
    dispatch(updateFormValue("BLOG", "summary", blog.summary));
    dispatch(pageChange(false));
  };

export const pageChange =
  (page: boolean) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: CHANGE_BLOG_PAGE,
      payload: page,
    });
  };

export const handleBlogDelete =
  (uuid: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      let res = await BlogService.destroy({ uuid }, token);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
