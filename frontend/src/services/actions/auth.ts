import { LOG_OUT } from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
export const logOut =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      await ProfileService.logout(token);
      dispatch({
        type: LOG_OUT,
      });
    } catch (err) {
      console.log(err);
    }
  };
