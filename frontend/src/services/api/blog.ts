import { instance, configForm, config } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";
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

// const getBlogProfileList = (token: string) => {
//   return instance.get("/blog/get-profiler/", config(token));
// };

let cancelToken: null | CancelTokenSource;
const getBlogProfileList = (token: string, pageNumber: number) => {
  if (cancelToken) {
    cancelToken.cancel();
  }
  cancelToken = axios.CancelToken.source();
  return instance.get(`/blog/get-profiler/${pageNumber}/`, {
    ...config(token),
    cancelToken: cancelToken.token,
  });
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

const blogDetails = (body: { uuid: string }, token: string) => {
  return instance.post("/blog/get-details/", body, config(token));
};

const BlogService = {
  create,
  getBlogProfileList,
  getBlogList,
  likeBlog,
  blogAddView,
  destroy,
  getBlogHomeList,
  blogDetails,
};

export default BlogService;
