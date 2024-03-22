import React from "react";
import { Grid, IconButton } from "@mui/material";
import { ImageSelect, MyLongTextField } from "..";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../assets/components/inputs/textField.scss";
interface CertificateSelectType {
  handleChangeFunc?: (
    uuid: string,
    image: Blob | null,
    comment: string
  ) => void;
  removeElement?: (uuid: string) => void;
  uuid: string;
  image: Blob | null;
  comment: string;
  [key: string]: any;
}

const CertificateSelect: React.FC<CertificateSelectType> = (props) => {
  const {
    handleChangeFunc = () => {},
    removeElement = () => {},
    uuid,
    image,
    comment,
    ...rest
  } = props;

  const handleCommentChange = async (e: string) => {
    handleChangeFunc(uuid, image, e);
  };

  const handleImageChange = async (e: Blob | null) => {
    handleChangeFunc(uuid, e, comment);
  };

  return (
    <Grid container alignItems={"center"}>
      <Grid
        item
        sx={{
          paddingRight: "8px",
          display: "flex",
        }}
      >
        <IconButton
          onClick={() => {
            removeElement(uuid);
          }}
        >
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2}>
          <Grid>
            <ImageSelect value={image} handleChangeFunc={handleImageChange} />
          </Grid>
          <Grid item xs={8} alignSelf={"center"}>
            <MyLongTextField
              value={comment}
              handleChangeFunc={handleCommentChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(CertificateSelect);
