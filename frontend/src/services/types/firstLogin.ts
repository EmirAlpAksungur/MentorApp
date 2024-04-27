export interface LanguagesType {
  uuid: string;
  name: string;
  level: number;
}

export interface CertificateType {
  uuid: string;
  image: string;
  comment: string;
}

export interface KnownSkillsType {
  uuid: string;
  skill: number[];
}

export interface UnKnownSkillsType {
  uuid: string;
  skill: number[];
  level: number;
}

export interface FirstLoginType {
  photo: Blob;
  about: string;
  location: number;
  university: number[];
  languages: LanguagesType[];
  certificate: CertificateType[];
  knownSkills: KnownSkillsType[];
  unKnownSkills: UnKnownSkillsType[];
}

export const FirstLoginFormType = [
  {
    reduxKey: "photo",
    size: 12,
    type: "image",
    labelId: 1507,
  },
  {
    reduxKey: "about",
    size: 12,
    type: "long-string",
    labelId: 1508,
  },
  {
    reduxKey: "location",
    size: 12,
    type: "location",
    labelId: 1509,
  },
  {
    reduxKey: "university",
    size: 12,
    type: "university",
    labelId: 1510,
  },
  {
    reduxKey: "languages",
    size: 12,
    type: "languages",
    labelId: 1511,
  },
  {
    reduxKey: "certificate",
    size: 12,
    type: "certificate",
    labelId: 1512,
  },
  {
    reduxKey: "knownSkills",
    size: 12,
    type: "knownSkills",
    labelId: 1513,
  },
  {
    reduxKey: "unKnownSkills",
    size: 12,
    type: "unKnownSkills",
    labelId: 1514,
  },
];
