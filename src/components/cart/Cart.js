import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./style";
import CartItem from "./cartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, updateCart, emptyCart, removeFromCart }) => {
  const style = useStyles();

  const EmptyCart = () => (
    <Typography varient="subtitle1">your cart is empty</Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={style.cartDetails}>
        <Typography variant="h4">
          subTotal:{cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={style.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            {" "}
            Empty Cart
          </Button>
          <Button
            className={style.checkOut}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            component={Link}
            to="/checkout"
          >
            {" "}
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "loading...";

  return (
    <Container>
      <div className={style.toolbar} />
      <Typography className={style.title} variant="h3">
        Your Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
