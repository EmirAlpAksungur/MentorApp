export interface LoginType {
  email: string;
  password: string;
}

export const LoginFormType = [
  {
    reduxKey: "email",
    size: 12,
    type: "string",
    labelId: 8,
  },
  {
    reduxKey: "password",
    size: 12,
    type: "password",
    labelId: 9,
  },
];
