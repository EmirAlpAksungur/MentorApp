export interface LoginType {
  Eposta: string;
  Password: string;
}

export const LoginFormType = [
  {
    reduxKey: "Eposta",
    size: 12,
    type: "string",
    labelId: 8,
  },
  {
    reduxKey: "Password",
    size: 12,
    type: "password",
    labelId: 9,
  },
];
