import React from "react";
import { TextField } from "@mui/material";
import "../../assets/components/inputs/longText.scss";
interface MyLongTextfieldType {
  handleChangeFunc?: (value: any) => void;
  value?: string;
  [key: string]: any;
}

const MylongTextfield: React.FC<MyLongTextfieldType> = (props) => {
  const { handleChangeFunc = () => {}, value = "", ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFunc(e.target.value);
  };

  return (
    <TextField
      {...rest}
      size="small"
      variant="outlined"
      value={value}
      onChange={handleChange}
      className="my-text-field"
      multiline
      minRows={4}
      maxRows={6}
    />
  );
};

export default React.memo(MylongTextfield);
