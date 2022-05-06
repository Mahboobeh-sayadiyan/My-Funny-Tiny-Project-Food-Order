import React, { useEffect, useReducer } from "react";
import classes from "./CartItem.module.css";

const reducer = (prevcount, action) => {
  if (action.type === "DECRESE") return prevcount - 1;
  else if (action.type === "INCRESE") return prevcount + 1;
  //else return prevcount;
};
const CartItem = (props) => {
  const item = props.itemvalue;
  const [countState, countDispatch] = useReducer(reducer, item.count);

  useEffect(() => {
    const editedItem = { ...item, count: countState };
    props.onChangeCount(editedItem);
  }, [countState]);

  const changeCountInc = () => {
    countDispatch({ type: "INCRESE" });
  };
  const changeCountDec = () => {
    countDispatch({ type: "DECRESE" });
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
