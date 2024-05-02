import { instance, configForm, config } from "./baseUnit";

const create = (body: FormData, token: string) => {
  return instance.post("/blog/post/", body, configForm(token));
};

const getBlogList = (token: string) => {
  return instance.get("/blog/get/", config(token));
};

const getBlogProfileList = (token: string) => {
  return instance.get("/blog/get-profiler/", config(token));
};

const destroy = (body: { uuid: string }, token: string) => {
  return instance.delete(`/blog/delete/${body.uuid}`, config(token));
};

const BlogService = {
  create,
  getBlogProfileList,
  getBlogList,
  destroy,
};

export default BlogService;
