import React, { useContext } from "react";
import CartItem from "./CartItem";
import classes from "./CartItems.module.css";
import Cartcontext from "../contexts/CartContext";
import CheckOutForm from "./CheckOutForm";

const CartItems = (props) => {
  const ctx = useContext(Cartcontext);
  const cartItems = ctx.cartItems;
  // const ChangeCountHandler = (editedValue) => {
  //   props.onChangeCount(editedValue);
  // };
  return (
    <div className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem key={item.id} itemvalue={item} />
      ))}
      <div className={classes.total}>
        <b>Total Amount</b>
        <b>
          $
          {cartItems.reduce((acc, item) => {
            const x = item.price * item.count;
            return (acc = Number((acc + x).toFixed(2)));
          }, 0)}
        </b>
      </div>
      {ctx.checkOut && <CheckOutForm />}
      {!ctx.checkOut && (
        <div className={classes.actions}>
          <button
            onClick={ctx.hideModalCart}
            className={classes["button--alt"]}
          >
            Close
          </button>
          <button
            onClick={ctx.emptyModalCart}
            className={classes["button--alt"]}
          >
            Empty cart
          </button>

          <button className={classes.button} onClick={ctx.orderCart}>
            Order
          </button>
        </div>
      )}
    </div>
  );
};
export default CartItems;
