import React, { useContext } from "react";
import classes from "./OrderedButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { showModalorder } from "../../store/modalorders-slice";

const CartButton = (props) => {
  const orderedItems = useSelector((state) => state.orderedItems.items);
  const dispatch = useDispatch();
  const showModalOrdersHandler = () => {
    dispatch(showModalorder());
  };
  return (
    <button className={classes.button} onClick={showModalOrdersHandler}>
      Orders
      <div className={classes.badge}>
        {orderedItems === null ? 0 : orderedItems.length}
      </div>
    </button>
  );
};
export default CartButton;
