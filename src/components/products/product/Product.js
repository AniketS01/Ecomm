import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./style";

const Product = ({ product, addToCart }) => {
  const style = useStyles();

  return (
    <Card className={style.root}>
      <CardMedia
        image={product.media.source}
        title={product.name}
        className={style.media}
      />
      <CardContent>
        <div className={style.content}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="h6"
          color="textSecondary"
          className={style.button}
        />
        <CardActions>
          <IconButton
            aria-lable="Add to cart"
            onClick={() => addToCart(product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Product;
