import React, { useRef } from "react";
import classes from "./MealForm.module.css";
import Input from "../UI/Input";

const MealForm = (props) => {
  const amountRef = useRef();
  const addItemToCartHandler = (e) => {
    e.preventDefault();
    const currentvalue = amountRef.current.currentvalue();
    if (currentvalue <= 0) amountRef.current.onFocus();
    else {
      props.onAddItem(currentvalue);
      amountRef.current.reset();
    }
  };
  return (
    <form className={classes.form} onSubmit={addItemToCartHandler}>
      <Input
        ref={amountRef}
        lable="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          max: 10,
          min: 0,
          step: 1,
          defaultValue: 1,
        }}
      ></Input>
      <button>Add</button>
    </form>
  );
};
export default MealForm;
