export interface SignUpType {
  Name: string;
  Surname: string;
  Eposta: string;
  Password: string;
}

export const SignUpFormType = [
  {
    reduxKey: "Name",
    size: 6,
    type: "string",
    labelId: 10,
  },
  {
    reduxKey: "Surname",
    size: 6,
    type: "string",
    labelId: 11,
  },
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
