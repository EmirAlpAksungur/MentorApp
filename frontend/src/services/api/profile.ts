import axios, { CancelTokenSource } from "axios";
import { instance, unAuthConfig, config, configForm } from "./baseUnit";

import { SignUpType } from "../types/signUp";
import { LoginType } from "../types/login";

const register = (body: SignUpType) => {
  return instance.post("/profile/register/", body, unAuthConfig);
};

const login = (body: LoginType) => {
  return instance.post("/profile/login/", body, unAuthConfig);
};

const logout = (token: string) => {
  return instance.get("/profile/logout/", config(token));
};

const getUser = (token: string) => {
  return instance.get("/profile/user-details/", config(token));
};

const fillProfile = (body: FormData, token: string) => {
  return instance.post("/profile/fill-profile-data/", body, configForm(token));
};

let cancelToken: null | CancelTokenSource;
const getProfile = (token: string, pageNumber: number) => {
  if (cancelToken) {
    cancelToken.cancel();
  }
  cancelToken = axios.CancelToken.source();
  return instance.get(`/profile/get-profile/${pageNumber}/`, {
    ...config(token),
    cancelToken: cancelToken.token,
  });
};

const isAuth = (token: string) => {
  return instance.get("/profile/is-auth/", config(token));
};
const oneUnKnownSkillContent = (
  body: {
    LanguageId: number;
    SkillId: string;
  },
  token: string
) => {
  return instance.post(
    "/profile/get-un-known-skill-content/",
    body,
    config(token)
  );
};
const ProfileService = {
  register,
  login,
  logout,
  getUser,
  fillProfile,
  getProfile,
  isAuth,
  oneUnKnownSkillContent,
};

export default ProfileService;
