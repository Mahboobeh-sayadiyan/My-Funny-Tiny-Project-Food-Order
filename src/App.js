import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Heaader";
import Meals from "./components/meal/Meals";
import Overlay from "./components/UI/Overlay";
import Modal from "./components/UI/Modal";
import CartItems from "./components/cart/CartItems";
import DUMMY_MEALS from "./components/config/Dummy-meals";
import Cartcontext from "./components/contexts/CartContext";

function App() {
  //localStorage.removeItem("cartItems");
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const cartHistory = JSON.parse(localStorage.getItem("cartItems"));
    setCart(cartHistory === null ? [] : cartHistory);
  }, []);

  const showModalCartHandler = () => {
    setShowModal(true);
  };
  const hideModalCartHandler = () => {
    setShowModal(false);
  };
  const emptyModalCartHandler = () => {
    setCart([]);
    localStorage.removeItem("cartItems");
  };
  const orderCartHandler = () => {
    setShowModal(false);
  };

  const addToCartHandler = (addedItem) => {
    const isExist = cart.findIndex((item) => item.id === addedItem.id);
    let newCart = [...cart];
    isExist !== -1
      ? (newCart[isExist].count += addedItem.count)
      : newCart.push(addedItem);
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };
  const changeCountHandler = (editedValue) => {
    const isExist = cart.findIndex((item) => item.id === editedValue.id);
    let newCart = [...cart];
    if (editedValue.count <= 0) newCart.splice(isExist, 1);
    else newCart[isExist].count = editedValue.count;

    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };
  return (
    <React.Fragment>
      {showModal &&
        ReactDOM.createPortal(
          <Overlay onHideModalCart={hideModalCartHandler} />,
          document.getElementById("overlayC")
        )}
      <Cartcontext.Provider value={cart}>
        {showModal &&
          ReactDOM.createPortal(
            <Modal>
              {cart.length === 0 ? (
                <h2>There is no item in cart!</h2>
              ) : (
                <CartItems
                  onHideModalCart={hideModalCartHandler}
                  onEmptyModalCart={emptyModalCartHandler}
                  onOrderCart={orderCartHandler}
                  onChangeCount={changeCountHandler}
                />
              )}
            </Modal>,
            document.getElementById("modalC")
          )}
        <Header onShowModalCart={showModalCartHandler} />
      </Cartcontext.Provider>
      <Meals meals={DUMMY_MEALS} onAddToCart={addToCartHandler} />
    </React.Fragment>
  );
}

export default App;
