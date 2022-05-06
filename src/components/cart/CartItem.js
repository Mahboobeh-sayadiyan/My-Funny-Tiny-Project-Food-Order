import React, { useReducer, useContext } from "react";
import classes from "./CartItem.module.css";
import Cartcontext from "../contexts/CartContext";

const reducer = (prevcount, action) => {
  if (action.type === "DECRESE") return prevcount - 1;
  else if (action.type === "INCRESE") return prevcount + 1;
  //else return prevcount;
};
const CartItem = (props) => {
  const ctx = useContext(Cartcontext);
  const item = props.itemvalue;
  const count = item.count;
  const [countState, countDispatch] = useReducer(reducer, count);

  const changeCountInc = () => {
    countDispatch({ type: "INCRESE" });
    const editedItem = { ...item, count: countState };
    ctx.changeCount(editedItem);
  };
  const changeCountDec = () => {
    countDispatch({ type: "DECRESE" });
    const editedItem = { ...item, count: countState };
    ctx.changeCount(editedItem);
  };

  //   countDispatch({ type: "DECRESE" })
  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>${item.price}</div>
          <div className={classes.amount}> X{countState}</div>
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={changeCountInc}>+</button>
        <button onClick={changeCountDec}>-</button>
      </div>
    </div>
  );
};
export default CartItem;
