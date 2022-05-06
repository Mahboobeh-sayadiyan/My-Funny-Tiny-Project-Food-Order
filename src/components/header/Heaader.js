import React from "react";
import classes from "./Header.module.css";
import imgURL from "../../img/meals.jpg";
import CartButton from "./CartButton";
import FloatNote from "../UI/FloatNote";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2>Food Oreder App</h2>
        <CartButton onClick={props.onShowModalCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={imgURL} alt="" />
      </div>
      <FloatNote />
    </React.Fragment>
  );
};
export default Header;
