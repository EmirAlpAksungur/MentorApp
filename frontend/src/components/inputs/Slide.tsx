import React from "react";
import Slider from "@mui/material/Slider";
import "../../assets/components/inputs/textField.scss";
interface SlideType {
  handleChangeFunc?: (value: any) => void;
  value: number;
  min: number;
  max: number;
  step: number;
  [key: string]: any;
}

const MySlide: React.FC<SlideType> = (props) => {
  const { handleChangeFunc = () => {}, value, ...rest } = props;

  const handleChange = (e: Event, newValue: number | number[]) => {
    handleChangeFunc(newValue);
  };
  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <Slider
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      onChange={handleChange}
      value={value}
      marks
      {...rest}
    />
  );
};

export default React.memo(MySlide);
