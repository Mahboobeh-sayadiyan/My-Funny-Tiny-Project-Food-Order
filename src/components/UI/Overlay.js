import React, { useContext } from "react";
import classes from "./Overlay.module.css";
import Cartcontext from "../contexts/CartContext";

const OverlayCart = (props) => {
  const ctx = useContext(Cartcontext);
  return <div className={classes.backdrop} onClick={ctx.hideModalCart}></div>;
};
export default OverlayCart;
