import React from "react";
import classes from "./Overlay.module.css";
const OverlayCart = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onHideModalCart}></div>
  );
};
export default OverlayCart;
