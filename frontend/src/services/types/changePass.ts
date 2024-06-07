export interface ChangePassType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordFormType = [
  {
    reduxKey: "oldPassword",
    size: 12,
    type: "password",
    labelId: 1641,
  },
  {
    reduxKey: "newPassword",
    size: 12,
    type: "password",
    labelId: 1642,
  },
  {
    reduxKey: "confirmPassword",
    size: 12,
    type: "password",
    labelId: 1643,
  },
];
