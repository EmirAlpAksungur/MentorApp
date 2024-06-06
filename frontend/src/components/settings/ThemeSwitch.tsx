import Switch from "@mui/material/Switch";
import "../../assets/components/theme/themeSwitch.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { changeTheme } from "../../services/actions/theme";
export default function CustomizedSwitches() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const handleChange = () => {
    dispatch(changeTheme());
  };
  return (
    <Switch
      className="theme-switch"
      checked={theme === "theme-dark" ? true : false}
      onChange={handleChange}
      icon={<LightModeIcon fontSize="small" className="theme-switch__icon" />}
      checkedIcon={
        <DarkModeIcon fontSize="small" className="theme-switch__icon" />
      }
    />
  );
}
