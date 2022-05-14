import React, { useState, useEffect, useReducer } from "react";
const Cartcontext = React.createContext({
  cartItems: [],
  orderedItems: [],
  showModal: false,
  showModalOrder: false,
  bump: false,
  checkOut: false,
  ordered: false,
  showModalCart: () => {},
  showModalOrders: () => {},
  hideModalCart: () => {},
  addToCart: (item) => {},
  changeCount: (item) => {},
  emptyModalCart: () => {},
  emptyModalOrder: () => {},
  orderCart: () => {},
  placeOrder: (date) => {},
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
      orderedItems: prevState.orderedItems,
      bump: isExist !== -1 ? prevState.bump : !prevState.bump,
      ordered: false,
    };
  } else if (action.type === "CHANGE") {
    const isExist = prevState.items.findIndex(
      (item) => item.id === action.value.id
    );
    let newCart = [...prevState.items];
    if (action.value.count <= 0) newCart.splice(isExist, 1);
    else newCart[isExist].count = action.value.count;
    return {
      items: newCart,
      orderedItems: prevState.orderedItems,
      bump: prevState.bump,
      ordered: false,
    };
  } else if (action.type === "EMPTY") {
    return {
      items: [],
      orderedItems: prevState.orderedItems,
      bump: false,
      ordered: false,
    };
  } else if (action.type === "EMPTYLIST") {
    return {
      items: prevState.items,
      orderedItems: [],
      bump: false,
      ordered: false,
    };
  } else if (action.type === "ORDER") {
    return {
      items: [],
      orderedItems: prevState.orderedItems.concat(action.orderedValue),
      bump: false,
      ordered: true,
    };
  } else if (action.type === "INITLOCALSTORAGE") {
    return {
      items: action.value,
      orderedItems: action.orderedValue,
      bump: false,
      ordered: false,
    };
  } else if (action.type === "RESETAFTERORDER") {
    return {
      items: prevState.items,
      orderedItems: prevState.orderedItems,
      bump: false,
      ordered: false,
    };
  }
};
export const CartcontextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  //   const [cart, setCart] = useState([]);;
  const [goBump, setGoBump] = useState(false);

  const [cart, cartDispatcher] = useReducer(reducer, {
    items: [],
    orderedItems: [],
    bump: false,
    ordered: false,
  });
  useEffect(() => {
    const cartHistory = JSON.parse(localStorage.getItem("cartItems"));
    const orderedHistory = JSON.parse(localStorage.getItem("ordertItems"));
    cartDispatcher({
      type: "INITLOCALSTORAGE",
      value: cartHistory === null ? [] : cartHistory,
      orderedValue: orderedHistory === null ? [] : orderedHistory,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart.items));
    localStorage.setItem("ordertItems", JSON.stringify(cart.orderedItems));
  }, [cart.items, cart.orderedItems]);

  useEffect(() => {
    setGoBump(true);
  }, [cart.bump]);

  const showModalCartHandler = () => {
    cartDispatcher({ type: "RESETAFTERORDER" });
    setShowModal(true);
  };
  const showModalOrdersHandler = () => {
    setShowModalOrder(true);
  };
  const hideModalCartHandler = () => {
    setCheckOut(false);
    setShowModal(false);
    setShowModalOrder(false);
  };

  const emptyModalCartHandler = () => {
    cartDispatcher({ type: "EMPTY" });
    //localStorage.removeItem("cartItems");
  };
  const emptyModalorderHandler = () => {
    cartDispatcher({ type: "EMPTYLIST" });
    //localStorage.removeItem("cartItems");
  };
  const orderCartHandler = () => {
    setCheckOut(true);
  };
  const placeOrderHandler = (date) => {
    cartDispatcher({
      type: "ORDER",
      orderedValue: cart.items.map((item) => {
        return { ...item, date: date };
      }),
    });
    setCheckOut(false);
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
        orderedItems: cart.orderedItems,
        bump: goBump,
        showModal: showModal,
        showModalOrder: showModalOrder,
        checkOut: checkOut,
        ordered: cart.ordered,
        showModalCart: showModalCartHandler,
        showModalOrders: showModalOrdersHandler,
        hideModalCart: hideModalCartHandler,
        addToCart: addToCartHandler,
        changeCount: changeCountHandler,
        emptyModalCart: emptyModalCartHandler,
        emptyModalOrder: emptyModalorderHandler,
        orderCart: orderCartHandler,
        placeOrder: placeOrderHandler,
      }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
};
export default Cartcontext;
