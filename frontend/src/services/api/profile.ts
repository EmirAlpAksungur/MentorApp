import { instance, unAuthConfig } from "./baseUnit";

import { SignUpType } from "../types/signUp";
import { LoginType } from "../types/login";

const register = (body: SignUpType) => {
  return instance.post("/profile/register/", body, unAuthConfig);
};

const login = (body: LoginType) => {
  return instance.post("/profile/login/", body, unAuthConfig);
};

const ProfileService = {
  register,
  login,
};

export default ProfileService;
