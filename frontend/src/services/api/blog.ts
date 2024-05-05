import { instance, configForm, config } from "./baseUnit";

const create = (body: FormData, token: string) => {
  return instance.post("/blog/post/", body, configForm(token));
};

const getBlogList = (token: string) => {
  return instance.get("/blog/get/", config(token));
};

const getBlogHomeList = (
  body: {
    follows: number[];
  },
  token: string
) => {
  return instance.post("/blog/get-home/", body, config(token));
};

const blogAddView = (body: { uuid: string }, token: string) => {
  return instance.post("/blog/add-view/", body, config(token));
};

const getBlogProfileList = (token: string) => {
  return instance.get("/blog/get-profiler/", config(token));
};
const likeBlog = (
  body: {
    from: number;
    to: number;
    uuid: string;
  },
  token: string
) => {
  return instance.post("/blog/like/", body, config(token));
};

const destroy = (body: { uuid: string }, token: string) => {
  return instance.delete(`/blog/delete/${body.uuid}`, config(token));
};

const BlogService = {
  create,
  getBlogProfileList,
  getBlogList,
  likeBlog,
  blogAddView,
  destroy,
  getBlogHomeList,
};

export default BlogService;
