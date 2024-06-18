import React from "react";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import "../../assets/components/inputs/imageSelect.scss";

interface MyImageSelectType {
  handleChangeFunc?: (value: string | null) => void;
  value?: string | null;
  [key: string]: any;
}
function fileToBase64(
  file: File,
  callback: (base64String: string) => void
): void {
  const reader = new FileReader();
  reader.onload = function (event) {
    const base64String = event?.target?.result as string;
    const base64Data = base64String.split(",")[1]; // Data URL'inden base64 veriyi ayırma
    callback(base64Data);
  };
  reader.readAsDataURL(file);
}
const MyTextfield: React.FC<MyImageSelectType> = (props) => {
  const { handleChangeFunc = () => {}, value = null, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      fileToBase64(selectedFile, (e: string) => {
        handleChangeFunc(e);
      });
    }
  };

  return (
    <div className="my-image-select">
      <Button
        component="label"
        className={`my-image-select__btn ${props?.className}`}
      >
        <input
          type="file"
          accept="image/*"
          className="my-image-select__btn__input"
          onChange={handleChange}
        />

        {value ? (
          <img
            src={`data:image/jpeg;base64,${value}`}
            className="my-image-select__btn__img"
          />
        ) : (
          <PhotoCameraIcon className="my-image-select__btn__icon" />
        )}
      </Button>
    </div>
  );
};

export default React.memo(MyTextfield);
