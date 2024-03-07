import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import "../../assets/components/inputs/imageSelect.scss";
import { Avatar } from "@mui/material";
interface MyTextfieldType {
  handleChangeFunc?: (value: Blob | null) => void;
  value?: Blob | undefined;
  [key: string]: any;
}

const MyTextfield: React.FC<MyTextfieldType> = (props) => {
  const { handleChangeFunc = () => {}, value = null, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const blobImage = new Blob([selectedFile], { type: selectedFile.type });
      handleChangeFunc(blobImage);
    }
  };

  return (
    <div className="my-image-select">
      <IconButton component="label" className="my-image-select__btn">
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
      </IconButton>
      {value && (
        <Avatar
          src={URL.createObjectURL(value)}
          className="my-image-select__avatar"
        />
      )}
    </div>
  );
};

export default React.memo(MyTextfield);
