import { useContext } from "react";
import classes from "./CheckOutForm.module.css";
import Cartcontext from "../contexts/CartContext";
import UseValid from "../../hooks/UseValid";
import UseFetch from "../../hooks/Usefetch";

const Checkout = (props) => {
  const ctx = useContext(Cartcontext);
  const { error, fetchMeals: sendData } = UseFetch();
  const {
    value: nameInput,
    inputIsValid: nameIsValid,
    inputIsInValid: nameIsInValid,
    checkValidaton: nameCheckValidation,
    reset: nameReset,
  } = UseValid((input) => input.trim().length > 5);

  const {
    value: streetInput,
    inputIsValid: streetIsValid,
    inputIsInValid: streetIsInValid,
    checkValidaton: streetCheckValidation,
    reset: streetReset,
  } = UseValid((input) => input.trim().length > 5);

  const formIsValid = nameIsValid && streetIsValid;

  const ChangeNameHnadler = (e) => {
    nameCheckValidation(e.target.value);
  };

  const ChangeStreetHnadler = (e) => {
    streetCheckValidation(e.target.value);
  };

  const palceOrderHandler = (event) => {
    event.preventDefault();

    const date = new Date();
    //sent data to back-end
    const config = {
      url: "https://movie-react-server-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        items: ctx.cartItems,
        customerName: nameInput,
        date: date.toString(),
      },
    };

    sendData(config, () => {});

    ctx.placeOrder(date.toString());
    //reset from
    nameReset();
    streetReset();
  };
  return (
    <form className={classes.form} onSubmit={palceOrderHandler}>
      {error && (
        <div>
          <p>Try Again!</p> <p>{error}</p>
        </div>
      )}
      <div
        className={`${classes.control} ${
          nameIsInValid ? classes.invalid : ""
        } `}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInput}
          onChange={ChangeNameHnadler}
          onBlur={ChangeNameHnadler}
        />
        {nameIsInValid && <p>Please enter the correct name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          streetIsInValid ? classes.invalid : ""
        } `}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetInput}
          onChange={ChangeStreetHnadler}
          onBlur={ChangeStreetHnadler}
        />
        {streetIsInValid && <p>Please enter the correct street name!</p>}
      </div>
      <div className={`${classes.control} ${nameIsInValid ? "invalid" : ""} `}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div
        className={`${classes.control} ${streetIsInValid ? "invalid" : ""} `}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={ctx.hideModalCart}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Palec sOrder
        </button>
      </div>
    </form>
  );
};

export default Checkout;
