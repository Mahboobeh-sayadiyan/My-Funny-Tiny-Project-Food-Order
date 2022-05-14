import classes from "./CheckOutForm.module.css";
import UseValid from "../../hooks/UseValid";
import UseFetch from "../../hooks/Usefetch";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, resetAfterOrder } from "../../store/cart-slice";
import { orderplaceOrder } from "../../store/ordered-slice";
import { hideModalCart } from "../../store/modal-slice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
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

  const hideModalCartHandler = () => {
    dispatch(hideModalCart());
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
        items: cartItems,
        customerName: nameInput,
        date: date.toString(),
      },
    };

    sendData(config, () => {});
    const orders = cartItems.map((item) => {
      return { ...item, date: date.toString() };
    });

    dispatch(placeOrder());
    dispatch(orderplaceOrder(orders));
    setTimeout(() => {
      dispatch(hideModalCart());
      dispatch(resetAfterOrder());
    }, 1000);

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
        <button type="button" onClick={hideModalCartHandler}>
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
