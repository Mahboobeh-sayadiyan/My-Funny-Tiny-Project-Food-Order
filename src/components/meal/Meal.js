import React, { useContext } from "react";
import classes from "./Meal.module.css";
import MealForm from "./MealForm";
// import Cartcontext from "../contexts/CartContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart-slice";

const Meal = (props) => {
  // const ctx = useContext(Cartcontext);
  const meal = props.mealvalue;
  const dispatch = useDispatch();
  const addItemHandler = (value) => {
    const addedItem = { ...meal, count: +value };
    // ctx.addToCart(addedItem);
    dispatch(addToCart(addedItem));
  };
  return (
    <div className={classes.meal}>
      <ul>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>${meal.price}</div>
      </ul>
      <MealForm onAddItem={addItemHandler} id={meal.id} />
    </div>
  );
};
export default Meal;
