import React from "react";
import { Grid } from "@material-ui/core";
import Product from "../products/product/Product";
import useStyles from "./style";

const Products = ({ products, addToCart }) => {
  const style = useStyles();
  return (
    <main className={style.content}>
      <div className={style.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
