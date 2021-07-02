import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const CustomTextField = ({ name, label, required, value }) => {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
        error={isError}
        render={({ field }) => (
          <TextField
            {...field}
            name={name}
            label={label}
            required={required}
            value={value}
          />
        )}
      />
    </Grid>
  );
};

export default CustomTextField;
