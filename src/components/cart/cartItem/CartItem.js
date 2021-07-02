import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";

import useStyles from "./style";

const CartItem = ({ item, removeFromCart, updateCart }) => {
  const style = useStyles();

  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={style.media}
      />
      <CardContent className={style.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={style.cartActions}>
        <div className={style.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => updateCart(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => updateCart(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
