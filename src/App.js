import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Heaader";
import Meals from "./components/meal/Meals";
import Overlay from "./components/UI/Overlay";
import Modal from "./components/UI/Modal";
import CartItems from "./components/cart/CartItems";
import OrderedItems from "./components/cart/OrderedItems";
// import Cartcontext from "./components/contexts/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { getCartData, setCartData } from "./store/cart-slice";
import { getOrderedData, setOrderedData } from "./store/ordered-slice";

function App() {
  // localStorage.removeItem("cartItems");
  // localStorage.removeItem("ordertItems");
  // const ctx = useContext(Cartcontext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const ordered = useSelector((state) => state.cart.ordered);
  const showModal = useSelector((state) => state.modal.showModal);
  const showModalOrder = useSelector(
    (state) => state.orderModal.showOrdersModal
  );
  const orderedItems = useSelector((state) => state.orderedItems.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrderedData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setCartData(cartItems));
  }, [cartItems, dispatch]);
  useEffect(() => {
    dispatch(setOrderedData(orderedItems));
  }, [orderedItems, dispatch]);

  return (
    <React.Fragment>
      {(showModal || showModalOrder) &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("overlayC"))}
      {showModal &&
        ReactDOM.createPortal(
          <Modal>
            {cartItems.length === 0 && !ordered && (
              <h2>There is no item in cart!</h2>
            )}
            {cartItems.length === 0 && ordered && (
              <h2>Your Items were placed order!</h2>
            )}
            {cartItems.length !== 0 && !ordered && <CartItems />}
          </Modal>,
          document.getElementById("modalC")
        )}
      {showModalOrder &&
        ReactDOM.createPortal(
          <Modal>
            {orderedItems.length === 0 && <h2>There is no order list!</h2>}
            {orderedItems.length !== 0 && <OrderedItems />}
          </Modal>,
          document.getElementById("modalO")
        )}
      <Header />
      <Meals />
    </React.Fragment>
  );
}

export default App;
