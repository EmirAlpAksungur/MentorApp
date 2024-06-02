import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "../../assets/components/inputs/checkbox.scss";
interface CheckBoxType {
  handleChangeFunc?: (value: any) => void;
  value?: boolean;
  [key: string]: any;
}

const MyCheckbox: React.FC<CheckBoxType> = (props) => {
  const { handleChangeFunc = () => {}, value = false, ...rest } = props;

  const handleChange = () => {
    handleChangeFunc(!value);
  };
  return (
    <FormControlLabel
      className={value ? "check-box check-box-checked" : "check-box "}
      control={<Checkbox checked={value} onChange={handleChange} {...rest} />}
      label={props?.label}
    ></FormControlLabel>
  );
};

export default MyCheckbox;
