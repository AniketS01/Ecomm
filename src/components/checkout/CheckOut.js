import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./style";
import AddressForm from "./forms/AddressForm";
import PaymentForm from "./forms/PaymentForm";
import { commerce } from "../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment Details"];
const CheckOut = ({ cart, order, handleCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const style = useStyles();
  const history = useHistory();

  useEffect(() => {
    const genereteToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
      }
    };
    genereteToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((activeState) => activeState + 1);
  };

  const backStep = () => {
    setActiveStep((activeState) => activeState - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm token={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        token={checkoutToken}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        next={next}
      />
    );

  let Confirmation = () =>
    order.customer ? (
      <>
        <Typography variant="h5">
          {" "}
          Thank you! for your purchase{order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}{" "}
        </Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    ) : (
      <div className={style.spinner}>
        {" "}
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5"> Error:{error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to home
      </Button>
    </>;
  }

  return (
    <>
      <CssBaseline />
      <div className={style.toolbar} />
      <main className={style.layout}>
        <Paper className={style.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={style.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default CheckOut;
