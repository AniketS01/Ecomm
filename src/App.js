import React, { useState, useEffect } from "react";
import Products from "./components/products/Products";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import CheckOut from "./components/checkout/CheckOut";
import { commerce } from "./lib/commerce";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");

  const getProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const getCart = async () => {
    await commerce.cart.retrieve().then((res) => setCart(res));
  };

  const addCart = async (productId, quantity) => {
    const res = await commerce.cart.add(productId);
    setCart(res.cart);
  };

  const updateCart = async (productId, quantity) => {
    const res = await commerce.cart.update(productId, { quantity });
    setCart(res.cart);
  };

  const removeFromCart = async (productId) => {
    const res = await commerce.cart.remove(productId);
    setCart(res.cart);
  };

  const emptyCart = async () => {
    const res = await commerce.cart.empty();
    setCart(res.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (tokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
      console.log("order placed");
    } catch (error) {
      setError(error.data.error.message);
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products products={products} addToCart={addCart} />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                updateCart={updateCart}
                emptyCart={emptyCart}
                removeFromCart={removeFromCart}
              />
            </Route>
            <Route exact path="/checkout">
              <CheckOut
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={error}
              />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
