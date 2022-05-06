import React from "react";
import classes from "./Card.module.css";
const Card = (props) => {
  const classattr = `${classes.card} ${props.className}`;
  return <div className={classattr}>{props.children}</div>;
};
export default Card;
