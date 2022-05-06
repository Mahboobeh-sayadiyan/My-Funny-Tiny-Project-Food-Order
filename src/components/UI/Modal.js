import React from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

const ModalCart = (props) => {
  return <Card className={classes.modal}>{props.children}</Card>;
};
export default ModalCart;
