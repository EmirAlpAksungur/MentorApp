export interface PersonalInfoType {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  location: number | null;
  nationality: number | null;
  profession: string | null;
  dateOfBirth: number | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
}

export const PersonalInfoFormType = [
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
    reduxKey: "nationality",
    size: 6,
    type: "location",
    labelId: 1657,
  },
  {
    reduxKey: "location",
    size: 6,
    type: "location",
    labelId: 1661,
  },
  {
    reduxKey: "profession",
    size: 6,
    type: "string",
    labelId: 1659,
  },
  {
    reduxKey: "dateOfBirth",
    size: 6,
    type: "datepicker",
    labelId: 1670,
  },
  {
    reduxKey: "github",
    size: 6,
    type: "string",
    labelId: 1671,
  },
  {
    reduxKey: "linkedin",
    size: 6,
    type: "string",
    labelId: 1672,
  },
  {
    reduxKey: "twitter",
    size: 6,
    type: "string",
    labelId: 1673,
  },
];
