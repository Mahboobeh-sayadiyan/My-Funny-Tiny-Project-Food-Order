import CartItem from "./CartItem";
import classes from "./CartItems.module.css";
// import Cartcontext from "../contexts/CartContext";
import CheckOutForm from "./CheckOutForm";
import { useSelector, useDispatch } from "react-redux";
import { emptyModalCart, orderCart } from "../../store/cart-slice";
import { hideModalCart } from "../../store/modal-slice";

const CartItems = (props) => {
  // const ctx = useContext(Cartcontext);
  // const cartItems = ctx.cartItems;
  // const ChangeCountHandler = (editedValue) => {
  //   props.onChangeCount(editedValue);
  // };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const checkOut = useSelector((state) => state.cart.checkOut);
  const dispatch = useDispatch();
  const emptyHandler = () => {
    dispatch(emptyModalCart());
  };
  const hideCartHandler = () => {
    dispatch(hideModalCart());
  };
  const orderCartHandler = () => {
    dispatch(orderCart());
  };

  return (
    <div className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem key={item.id} itemvalue={item} />
      ))}
      <div className={classes.total}>
        <b>Total Amount</b>
        <b>
          $
          {cartItems.reduce((acc, item) => {
            const x = item.price * item.count;
            return (acc = Number((acc + x).toFixed(2)));
          }, 0)}
        </b>
      </div>
      {checkOut && <CheckOutForm />}
      {!checkOut && (
        <div className={classes.actions}>
          <button onClick={hideCartHandler} className={classes["button--alt"]}>
            Close
          </button>
          <button onClick={emptyHandler} className={classes["button--alt"]}>
            Empty cart
          </button>

          <button className={classes.button} onClick={orderCartHandler}>
            Order
          </button>
        </div>
      )}
    </div>
  );
};
export default CartItems;
