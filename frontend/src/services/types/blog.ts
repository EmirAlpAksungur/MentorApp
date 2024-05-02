export interface BlogType {
  title: string;
  photo: string;
  blog: string;
  summary: string;
  uuid: string;
}

export const BlogFormType = [
  {
    reduxKey: "title",
    size: 12,
    type: "string",
    labelId: 1507,
  },
  {
    reduxKey: "photo",
    size: 2,
    type: "image",
    labelId: 1507,
  },
  {
    reduxKey: "summary",
    size: 10,
    type: "long-string",
    labelId: 1508,
  },
  {
    reduxKey: "blog",
    size: 12,
    type: "long-string",
    labelId: 1508,
  },
];
