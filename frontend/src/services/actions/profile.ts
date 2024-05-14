import { UPDATE_USER } from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
export const follow =
  (user_id: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const body = { user_id };
      await ProfileService.follow(body, token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

export const saveBlog =
  (
    likes: number[],
    dislikes: number[],
    views: number[],
    uuid: string,
    title: string
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const blogList = getState().auth?.user?.savedBlog;
      const body = { uuid };
      console.log(uuid);

      await ProfileService.saveBlog(body, token);
      if (blogList.find((e: any) => e.uuid === uuid) === undefined) {
        dispatch({
          type: UPDATE_USER,
          payload: {
            key: "savedBlog",
            value: [
              ...blogList,
              {
                likes,
                dislikes,
                views,
                uuid,
                title,
              },
            ],
          },
        });
      } else {
        dispatch({
          type: UPDATE_USER,
          payload: {
            key: "savedBlog",
            value: [...blogList.filter((e: any) => e.uuid !== uuid)],
          },
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
