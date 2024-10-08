import React from "react";
import { TextField } from "@mui/material";
import "../../assets/components/inputs/textField.scss";
interface MyTextfieldType {
  handleChangeFunc?: (value: any) => void;
  value?: string;
  error?: boolean;
  [key: string]: any;
}

const MyTextfield: React.FC<MyTextfieldType> = (props) => {
  const {
    handleChangeFunc = () => {},
    value = "",
    error = false,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFunc(e.target.value);
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      value={value}
      onChange={handleChange}
      className={`my-text-field ${error && "my-text-field-error"}`}
      {...rest}
    />
  );
};

export default React.memo(MyTextfield);
