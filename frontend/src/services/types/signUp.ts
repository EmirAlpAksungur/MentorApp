export interface SignUpType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const SignUpFormType = [
  {
    reduxKey: "first_name",
    size: 6,
    type: "string",
    labelId: 10,
  },
  {
    reduxKey: "last_name",
    size: 6,
    type: "string",
    labelId: 11,
  },
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
