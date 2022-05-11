import React, { useContext } from "react";
import classes from "./OrderedButton.module.css";
import Cartcontext from "../contexts/CartContext";

const CartButton = (props) => {
  const ctx = useContext(Cartcontext);

  return (
    <button className={classes.button} onClick={ctx.showModalOrders}>
      Orders
      <div className={classes.badge}>
        {ctx.orderedItems === null ? 0 : ctx.orderedItems.length}
      </div>
    </button>
  );
};
export default CartButton;
