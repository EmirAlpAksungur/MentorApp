import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../assets/components/select/select.scss";
interface MySelectProps {
  values?: any[];
  valuesPath?: string | null;
  dataTextPath?: string | null;
  handleChangeFunc?: (value: any) => void;
  defaultValue?: string;
  errFunc?: () => boolean;
  disabled?: boolean;
  [key: string]: any;
}

const MySelect: React.FC<MySelectProps> = (props) => {
  const {
    values = [],
    valuesPath = null,
    dataTextPath = null,
    handleChangeFunc = () => {},
    defaultValue = "",
    error = false,
    disabled = false,
    ...rest
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFunc(event.target.value);
  };

  return (
    <Box className={"my-select-box"}>
      <FormControl fullWidth>
        <Select
          className={"my-select-box__select"}
          disabled={disabled}
          error={error}
          value={defaultValue}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              className: "my-select-box__select__pop-up",
              style: {
                maxHeight: "300px",
              },
            },
          }}
          {...rest}
        >
          {values.map((e, key) => {
            return (
              <MenuItem
                key={key}
                value={valuesPath ? e?.[valuesPath] : e}
                className={`my-select-box__select__pop-up__menu-item
                ${
                  (valuesPath ? e?.[valuesPath] : e) === defaultValue &&
                  "my-select-box__select__pop-up__selected"
                }
                `}
              >
                {dataTextPath ? e?.[dataTextPath] : e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MySelect;
