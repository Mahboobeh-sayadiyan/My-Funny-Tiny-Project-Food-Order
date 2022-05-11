import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../UI/Card";
import Meal from "./Meal";
import classes from "./Meals.module.css";
import UseFetch from "../../hooks/Usefetch";

const Meals = (props) => {
  const [meals, setMeals] = useState([]);
  const config = useMemo(() => {
    return {
      url: "https://movie-react-server-default-rtdb.firebaseio.com/meal.json",
    };
  }, []);

  const applyData = useCallback((data) => {
    const newMealsArray = [];
    for (const key in data) newMealsArray.push({ id: key, ...data[key] });
    setMeals(newMealsArray);
  }, []);

  const { isLoading, error, fetchMeals } = UseFetch();

  useEffect(() => {
    fetchMeals(config, applyData);
  }, [fetchMeals, applyData, config]);

  return (
    <Card className={classes.meals}>
      {isLoading && <p>is loading ...</p>}
      {error !== null && <p>{error}</p>}
      {meals.map((meal) => (
        <Meal key={meal.id} mealvalue={meal} />
      ))}
    </Card>
  );
};
export default Meals;
