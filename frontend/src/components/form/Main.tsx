import React from "react";
import { Grid } from "@mui/material";
import { FormType } from "../../services/types/form";
import InputsBody from "./InputsBody";

const Form: React.FC<FormType> = ({ reduxConnectionString, formElements }) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={3} className="form-container">
      {Object.values(formElements).map((element, index) => {
        return (
          <InputsBody
            key={index}
            formElement={element}
            reduxConnectionString={reduxConnectionString}
          />
        );
      })}
    </Grid>
  );
};

export default React.memo(Form);
