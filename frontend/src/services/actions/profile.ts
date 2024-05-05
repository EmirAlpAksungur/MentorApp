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
