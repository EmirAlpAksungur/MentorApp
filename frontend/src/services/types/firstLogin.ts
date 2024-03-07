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
    labelId: 29,
  },
  {
    reduxKey: "about",
    size: 12,
    type: "long-string",
    labelId: 29,
  },
  {
    reduxKey: "location",
    size: 12,
    type: "location",
    labelId: 29,
  },
  {
    reduxKey: "university",
    size: 12,
    type: "university",
    labelId: 29,
  },
  {
    reduxKey: "languages",
    size: 12,
    type: "languages",
    labelId: 29,
  },
  {
    reduxKey: "certificate",
    size: 12,
    type: "certificate",
    labelId: 29,
  },
  {
    reduxKey: "knownSkills",
    size: 12,
    type: "knownSkills",
    labelId: 29,
  },
  {
    reduxKey: "unKnownSkills",
    size: 12,
    type: "unKnownSkills",
    labelId: 29,
  },
];
