import React, { useContext } from "react";
import OrderedItem from "./OrderedItem";
import classes from "./CartItems.module.css";
import Cartcontext from "../contexts/CartContext";

const OrderedItems = (props) => {
  const ctx = useContext(Cartcontext);
  const orderedItems = ctx.orderedItems;
  return (
    <div className={classes["cart-items"]}>
      {orderedItems.map((item) => (
        <OrderedItem key={`${item.id}${item.date}`} itemvalue={item} />
      ))}
      <div className={classes.actions}>
        <button onClick={ctx.hideModalCart} className={classes["button--alt"]}>
          Close
        </button>
        <button
          onClick={ctx.emptyModalOrder}
          className={classes["button--alt"]}
        >
          Delete List
        </button>
      </div>
    </div>
  );
};
export default OrderedItems;
