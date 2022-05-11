import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Heaader";
import Meals from "./components/meal/Meals";
import Overlay from "./components/UI/Overlay";
import Modal from "./components/UI/Modal";
import CartItems from "./components/cart/CartItems";
import OrderedItems from "./components/cart/OrderedItems";
import Cartcontext from "./components/contexts/CartContext";

function App() {
  //localStorage.removeItem("cartItems");
  const ctx = useContext(Cartcontext);
  return (
    <React.Fragment>
      {(ctx.showModal || ctx.showModalOrder) &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("overlayC"))}
      {ctx.showModal &&
        ReactDOM.createPortal(
          <Modal>
            {ctx.cartItems.length === 0 && !ctx.ordered && (
              <h2>There is no item in cart!</h2>
            )}
            {ctx.cartItems.length === 0 && ctx.ordered && (
              <h2>Your Items were placed order!</h2>
            )}
            {ctx.cartItems.length !== 0 && !ctx.ordered && <CartItems />}
          </Modal>,
          document.getElementById("modalC")
        )}
      {ctx.showModalOrder &&
        ReactDOM.createPortal(
          <Modal>
            {ctx.orderedItems.length === 0 && <h2>There is no order list!</h2>}
            {ctx.orderedItems.length !== 0 && <OrderedItems />}
          </Modal>,
          document.getElementById("modalO")
        )}
      <Header />
      <Meals />
    </React.Fragment>
  );
}

export default App;
