export interface FirstLoginType {
  mentorInfo: string;
  studentInfo: string;
}

export const FirstLoginFormType = [
  {
    reduxKey: "mentorInfo",
    size: 12,
    type: "long-string",
    labelId: 29,
  },
  {
    reduxKey: "studentInfo",
    size: 12,
    type: "long-string",
    labelId: 30,
  },
];
