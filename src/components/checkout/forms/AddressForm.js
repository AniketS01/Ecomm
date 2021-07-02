import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";
const AddressForm = ({ token, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const getCountries = async (tokenId) => {
    await commerce.services.localeListCountries(tokenId).then((response) => {
      setShippingCountries(response.countries);
      setShippingCountry(Object.keys(response.countries)[0]);
    });
  };

  const getSubDivisions = async (countryCode) => {
    commerce.services.localeListSubdivisions(countryCode).then((response) => {
      setShippingSubdivisions(response.subdivisions);
      setShippingSubdivision(Object.keys(response.subdivisions)[0]);
    });
  };

  const getShippingOptions = async (checkoutTokenId, country, region) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    getCountries(token.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) getSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      getShippingOptions(token.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subDivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <CustomTextField required name="firstName" label="First name" />
            <CustomTextField required name="lastName" label="Last name" />
            <CustomTextField required name="address1" label="Address" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="City" label="City" />
            <CustomTextField required name="ZIP" label="ZIP / postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subDivisions.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping country</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Proceed
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
