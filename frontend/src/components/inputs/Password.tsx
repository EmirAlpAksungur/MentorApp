import React from "react";
import { TextField } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  const [type, setType] = React.useState<string>("password");
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
      type={type}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                type === "password" ? setType("text") : setType("password");
              }}
            >
              {type === "password" ? (
                <VisibilityOffIcon className="end-adorment" />
              ) : (
                <VisibilityIcon className="end-adorment" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default React.memo(MyTextfield);
