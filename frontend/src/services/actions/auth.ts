import { LOG_OUT } from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import ProfileService from "../api/profile";
import { routeToUrl } from "../../routers/utils";
import { changeNotification } from "./notification";
export const logOut =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      await ProfileService.logout(token);
      dispatch({
        type: LOG_OUT,
      });
      localStorage.removeItem("token");
      routeToUrl("/");
    } catch (err) {
      console.log(err);
    }
  };

export const deleteAccount: any =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
      let res = await ProfileService.removeAcc(token);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: 1639,
        })
      );
      dispatch({
        type: LOG_OUT,
      });
      localStorage.removeItem("token");
      routeToUrl("/");
    } catch (err: any) {
      dispatch(
        changeNotification({
          NotificationCode: "error",
          NotificationText: 1640,
        })
      );
    }
  };
