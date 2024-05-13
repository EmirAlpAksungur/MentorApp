import { instance, configForm, config } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";
const create = (body: FormData, token: string) => {
  return instance.post("/blog/post/", body, configForm(token));
};

const blogAddView = (body: { uuid: string }, token: string) => {
  return instance.post("/blog/add-view/", body, config(token));
};

let cancelTokenHome: null | CancelTokenSource;
const getBlogHomeList = (
  body: {
    follows: number[];
  },
  token: string,
  pageNumber: number
) => {
  if (cancelTokenHome) {
    cancelTokenHome.cancel();
  }
  cancelTokenHome = axios.CancelToken.source();
  return instance.post(`/blog/get-home/${pageNumber}/`, body, {
    ...config(token),
    cancelToken: cancelTokenHome.token,
  });
};

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

let cancelTokenGet: null | CancelTokenSource;
const getBlogList = (token: string, pageNumber: number) => {
  if (cancelTokenGet) {
    cancelTokenGet.cancel();
  }
  cancelTokenGet = axios.CancelToken.source();
  return instance.get(`/blog/get/${pageNumber}/`, {
    ...config(token),
    cancelToken: cancelTokenGet.token,
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

const blogTopView = (token: string) => {
  return instance.get(`/blog/get-top-views/`, config(token));
};

const blogTopLikes = (token: string) => {
  return instance.get(`/blog/get-top-likes/`, config(token));
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
  blogTopView,
  blogTopLikes,
};

export default BlogService;
