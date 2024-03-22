import { useCallback, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CertificateSelect from "../CertificateSelect";
import { uuidv4 } from "../../../utils/uuidGenerator";
export interface CertificateElementType {
  uuid: string;
  image: Blob | null;
  comment: string;
}

interface CertificateSelectContType {
  handleChangeFunc?: (value: CertificateElementType[]) => void;
  value?: CertificateElementType[];
  [key: string]: any;
}

export default function UniversityContainer(props: CertificateSelectContType) {
  const { handleChangeFunc = () => {}, value = [], ...rest } = props;

  const addNewCertificate = () => {
    const copy = Array.from(value);
    copy.push({
      uuid: uuidv4(),
      image: null,
      comment: "",
    });
    handleChangeFunc(copy);
  };

  const handleChange = (uuid: string, image: Blob | null, comment: string) => {
    let copy = JSON.stringify(value);

    const copyArr = JSON.parse(copy).map((e: CertificateElementType) => {
      if (e.uuid === uuid) {
        e.image = image;
        e.comment = comment;
      }
      return e;
    });

    handleChangeFunc(copyArr);
  };
  const removeElement = (uuid: string) => {
    let copy = JSON.stringify(value);

    const copyArr = JSON.parse(copy).filter(
      (e: CertificateElementType) => e.uuid !== uuid
    );

    handleChangeFunc(copyArr);
  };
  return (
    <Grid container rowSpacing={2}>
      {value.map((e) => {
        return (
          <Grid key={e.uuid} item xs={12}>
            <CertificateSelect
              uuid={e.uuid}
              image={e.image}
              comment={e.comment}
              handleChangeFunc={handleChange}
              removeElement={removeElement}
            />
          </Grid>
        );
      })}
      <Grid key={"new_certificate"} item xs={12}>
        <IconButton onClick={addNewCertificate}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
