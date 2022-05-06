import React, { useContext } from "react";
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
  const ctx = useContext(Cartcontext);

  return (
    <React.Fragment>
      {ctx.showModal &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("overlayC"))}
      {ctx.showModal &&
        ReactDOM.createPortal(
          <Modal>
            {ctx.cartItems.length === 0 ? (
              <h2>There is no item in cart!</h2>
            ) : (
              <CartItems />
            )}
          </Modal>,
          document.getElementById("modalC")
        )}
      <Header />
      <Meals meals={DUMMY_MEALS} />
    </React.Fragment>
  );
}

export default App;
