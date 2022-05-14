import React, { useReducer } from "react";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { changeCount } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const item = props.itemvalue;
  const count = item.count;

  const changeCountInc = () => {
    dispatch(changeCount({ ...item, count: count + 1 }));
  };
  const changeCountDec = () => {
    dispatch(changeCount({ ...item, count: count - 1 }));
  };

  //   countDispatch({ type: "DECRESE" })
  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>${item.price}</div>
          <div className={classes.amount}> X{count}</div>
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
