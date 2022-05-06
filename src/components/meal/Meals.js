import React from "react";
import Card from "../UI/Card";
import Meal from "./Meal";
import classes from "./Meals.module.css";

const MealsList = (props) => {
  const addToCartHandler = (item) => {
    props.onAddToCart(item);
  };
  const meals = props.meals;
  return (
    <Card className={classes.meals}>
      {meals.map((meal) => (
        <Meal key={meal.id} mealvalue={meal} onAddToCart={addToCartHandler} />
      ))}
    </Card>
  );
};
export default MealsList;
