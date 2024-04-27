import React from "react";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import "../../assets/components/inputs/imageSelect.scss";

interface MyImageSelectType {
  handleChangeFunc?: (value: Blob | null) => void;
  value?: Blob | null;
  [key: string]: any;
}

const MyTextfield: React.FC<MyImageSelectType> = (props) => {
  const { handleChangeFunc = () => {}, value = null, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      console.log(selectedFile.type);
      const blobImage = new Blob([selectedFile], {
        type: selectedFile.type.split("/")[1],
      });
      handleChangeFunc(blobImage);
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
            src={URL.createObjectURL(value)}
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
