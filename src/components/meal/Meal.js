import React from "react";
import classes from "./Meal.module.css";
import MealForm from "./MealForm";

const Meal = (props) => {
  const meal = props.mealvalue;
  const addItemHandler = (value) => {
    const addedItem = { ...meal, count: +value };
    props.onAddToCart(addedItem);
  };
  return (
    <div className={classes.meal}>
      <ul>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>${meal.price}</div>
      </ul>
      <MealForm onAddItem={addItemHandler} />
    </div>
  );
};
export default Meal;
