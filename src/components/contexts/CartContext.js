import React, { useState, useEffect, useReducer } from "react";
const Cartcontext = React.createContext({
  cartItems: [],
  showModal: false,
  bump: false,
  showModalCart: () => {},
  hideModalCart: () => {},
  addToCart: (item) => {},
  changeCount: (item) => {},
  emptyModalCart: () => {},
  orderCart: () => {},
});
const reducer = (prevState, action) => {
  if (action.type === "ADD") {
    const isExist = prevState.items.findIndex(
      (item) => item.id === action.value.id
    );
    let newCart = [...prevState.items];
    isExist !== -1
      ? (newCart[isExist].count += action.value.count)
      : newCart.push(action.value);
    return {
      items: newCart,
      bump: isExist !== -1 ? prevState.bump : !prevState.bump,
    };
  } else if (action.type === "CHANGE") {
    const isExist = prevState.items.findIndex(
      (item) => item.id === action.value.id
    );
    let newCart = [...prevState.items];
    if (action.value.count <= 0) newCart.splice(isExist, 1);
    else newCart[isExist].count = action.value.count;
    return { items: newCart, bump: prevState.bump };
  } else if (action.type === "EMPTY") {
    return { items: [], bump: false };
  } else if (action.type === "INITLOCALSTORAGE") {
    return { items: action.value, bump: false };
  }
};
export const CartcontextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  //   const [cart, setCart] = useState([]);;
  const [goBump, setGoBump] = useState(false);

  const [cart, cartDispatcher] = useReducer(reducer, {
    items: [],
    bump: false,
  });
  useEffect(() => {
    const cartHistory = JSON.parse(localStorage.getItem("cartItems"));
    cartDispatcher({
      type: "INITLOCALSTORAGE",
      value: cartHistory === null ? [] : cartHistory,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart.items));
  }, [cart.items]);

  useEffect(() => {
    setGoBump(true);
  }, [cart.bump]);

  const showModalCartHandler = () => {
    setShowModal(true);
  };
  const hideModalCartHandler = () => {
    setShowModal(false);
  };

  const emptyModalCartHandler = () => {
    cartDispatcher({ type: "EMPTY" });
    //localStorage.removeItem("cartItems");
  };
  const orderCartHandler = () => {
    setShowModal(false);
  };
  const addToCartHandler = (addedItem) => {
    setGoBump(false);
    cartDispatcher({ type: "ADD", value: addedItem });
  };
  const changeCountHandler = (editedValue) => {
    cartDispatcher({ type: "CHANGE", value: editedValue });
  };
  return (
    <Cartcontext.Provider
      value={{
        cartItems: cart.items,
        bump: goBump,
        showModal: showModal,
        showModalCart: showModalCartHandler,
        hideModalCart: hideModalCartHandler,
        addToCart: addToCartHandler,
        changeCount: changeCountHandler,
        emptyModalCart: emptyModalCartHandler,
        orderCart: orderCartHandler,
      }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
};
export default Cartcontext;
