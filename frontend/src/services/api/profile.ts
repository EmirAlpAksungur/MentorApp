import { instance, unAuthConfig, config } from "./baseUnit";

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

const fillProfile = (body: SignUpType, token: string) => {
  return instance.post("/profile/fill-profile-data/", body, config(token));
};

const getProfile = (token: string) => {
  return instance.get("/profile/get-profile/", config(token));
};

const isAuth = (token: string) => {
  return instance.get("/profile/is-auth/", config(token));
};

const ProfileService = {
  register,
  login,
  logout,
  getUser,
  fillProfile,
  getProfile,
  isAuth,
};

export default ProfileService;
