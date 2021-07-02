import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./style";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const style = useStyles();

  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={style.appBar} color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            className={style.title}
          >
            Ecomm
          </Typography>
          <div className={style.grow} />
          <div className={style.button}>
            {location.pathname === "/" && (
              <IconButton
                aria-lable="cart items"
                component={Link}
                to="/cart"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
