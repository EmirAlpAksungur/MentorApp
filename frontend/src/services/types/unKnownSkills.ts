export interface UnKnownSkillsType {
  uuid: string;
  skill: number;
  level: number;
}

export interface UnKnownSkillsTypes {
  unKnownSkills: UnKnownSkillsType[];
}

export const UnKnownSkillsFormType = [
  {
    reduxKey: "unKnownSkills",
    size: 12,
    type: "unKnownSkills",
    labelId: 1514,
  },
];
