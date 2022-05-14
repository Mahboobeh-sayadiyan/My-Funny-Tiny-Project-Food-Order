import React, { useContext } from "react";
import OrderedItem from "./OrderedItem";
import classes from "./CartItems.module.css";
import { useEffect } from "react";
// import Cartcontext from "../contexts/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { hideModalorder } from "../../store/modalorders-slice";
import { emptyModalorder, setOrderedData } from "../../store/ordered-slice";

const OrderedItems = (props) => {
  // const ctx = useContext(Cartcontext);
  // const orderedItems = ctx.orderedItems;
  const orderedItems = useSelector((state) => state.orderedItems.items);
  const dispatch = useDispatch();
  const hideOrderHandler = () => {
    dispatch(hideModalorder());
  };
  const emptyOrderHandler = () => {
    dispatch(emptyModalorder());
  };

  return (
    <div className={classes["cart-items"]}>
      {orderedItems.map((item) => (
        <OrderedItem key={`${item.id}${item.date}`} itemvalue={item} />
      ))}
      <div className={classes.actions}>
        <button onClick={hideOrderHandler} className={classes["button--alt"]}>
          Close
        </button>
        <button onClick={emptyOrderHandler} className={classes["button--alt"]}>
          Delete List
        </button>
      </div>
    </div>
  );
};
export default OrderedItems;
