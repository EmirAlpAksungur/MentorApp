import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "../../assets/components/inputs/datepicker.scss";
interface DatePickerProps {
  value: number;
  handleChangeFunc: (value: number) => void;
  [key: string]: any;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, handleChangeFunc, error, ...rest } = props;
  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        defaultValue={value !== 0 ? dayjs(value) : undefined}
        value={value !== 0 ? dayjs(value) : undefined}
        onChange={(newValue) => {
          if (newValue) props.handleChangeFunc(newValue.valueOf());
        }}
        className={`date-picker ${error && "date-picker-error"}`}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
