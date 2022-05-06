import React, { useContext } from "react";
import CartItem from "./CartItem";
import classes from "./CartItems.module.css";
import Cartcontext from "../contexts/CartContext";

const CartItems = (props) => {
  const ctx = useContext(Cartcontext);
  const cartItems = ctx;
  const ChangeCountHandler = (editedValue) => {
    props.onChangeCount(editedValue);
  };
  return (
    <div className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          itemvalue={item}
          onChangeCount={ChangeCountHandler}
        />
      ))}
      <div className={classes.total}>
        <b>Total Amount</b>
        <b>
          $
          {ctx.reduce((acc, item) => {
            const x = item.price * item.count;
            return (acc += Number(x.toFixed(2)));
          }, 0)}
        </b>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onHideModalCart}
          className={classes["button--alt"]}
        >
          Close
        </button>
        <button
          onClick={props.onEmptyModalCart}
          className={classes["button--alt"]}
        >
          Empty cart
        </button>

        <button className={classes.button} onClick={props.onOrderCart}>
          Order
        </button>
      </div>
    </div>
  );
};
export default CartItems;
