import axios, { CancelTokenSource } from "axios";
import { instance, unAuthConfig, config, configForm } from "./baseUnit";

import { SignUpType } from "../types/signUp";
import { LoginType } from "../types/login";
import { PersonalInfoType } from "../types/personalInfo";
import { KnownSkillsType } from "../types/knownSkills";
import { UnKnownSkillsType } from "../types/unKnownSkills";
import { LanguagesTypes } from "../types/languages";
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

const follow = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/follow/", body, configForm(token));
};

const saveBlog = (body: { uuid: string }, token: string) => {
  return instance.post("/profile/save-blog/", body, configForm(token));
};
const removeAcc = (token: string) => {
  return instance.delete("/profile/delete/", config(token));
};

const changePass = (
  body: {
    oldPassword: string | undefined;
    newPassword: string | undefined;
    confirmPassword: string | undefined;
  },
  token: string
) => {
  return instance.put("/profile/change-password/", body, config(token));
};

const getAboutMe = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/about-me/", body, config(token));
};

const aboutUpdate = (body: { about: string }, token: string) => {
  return instance.post("/profile/about-me-update/", body, config(token));
};

const getPersonalInfo = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/personal-info/", body, config(token));
};

const updatePersonalInfo = (body: PersonalInfoType, token: string) => {
  return instance.post("/profile/personal-info-update/", body, config(token));
};

const getSkills = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/skills/", body, config(token));
};

const updateSklls = (body: KnownSkillsType, token: string) => {
  return instance.post("/profile/skills-update/", body, config(token));
};

const getUnknownSkills = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/unknown-skills/", body, config(token));
};

const updateUnknownSklls = (body: UnKnownSkillsType, token: string) => {
  return instance.post("/profile/unknown-skills-update/", body, config(token));
};

const updatePhoto = (body: { photo: string }, token: string) => {
  return instance.post("/profile/profile-photo-update/", body, config(token));
};

const getProfileLanguages = (body: { user_id: number }, token: string) => {
  return instance.post("/profile/languages/", body, config(token));
};

const updateProfileLanguages = (body: LanguagesTypes, token: string) => {
  return instance.post("/profile/languages-update/", body, config(token));
};

const ProfileService = {
  register,
  login,
  logout,
  getUser,
  getProfile,
  isAuth,
  oneUnKnownSkillContent,
  follow,
  saveBlog,
  removeAcc,
  changePass,
  getAboutMe,
  aboutUpdate,
  getPersonalInfo,
  updatePersonalInfo,
  getSkills,
  updateSklls,
  getUnknownSkills,
  updateUnknownSklls,
  updatePhoto,
  getProfileLanguages,
  updateProfileLanguages,
};

export default ProfileService;
