import { createSlice } from "@reduxjs/toolkit";
const orderedState = createSlice({
  name: "orderedItems",
  initialState: { items: [] },
  reducers: {
    initial: (state, action) => {
      state.items = action.payload;
    },
    emptyModalorder: (state) => {
      state.items = [];
    },
    orderplaceOrder: (state, action) => {
        
      state.items = state.items.concat(action.payload);
    },
    addToOrderList: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const { emptyModalorder, initial, orderplaceOrder, addToOrderList } =
  orderedState.actions;

export const getOrderedData = () => {
  return (dispatch) => {
    const ordersHistory = JSON.parse(localStorage.getItem("ordertItems"));
    dispatch(initial(ordersHistory === null ? [] : ordersHistory));
  };
};
export const setOrderedData = (orderitems) => {
  return (dispatch) => {
    localStorage.setItem("ordertItems", JSON.stringify(orderitems));
  };
};

export default orderedState;
