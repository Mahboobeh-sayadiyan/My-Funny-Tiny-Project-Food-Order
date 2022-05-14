import { createSlice } from "@reduxjs/toolkit";
const cartState = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    bump: false,
    checkOut: false,
    ordered: false,
  },
  reducers: {
    initial: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const isExist = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      isExist !== -1
        ? (state.cartItems[isExist].count += action.payload.count)
        : state.cartItems.push(action.payload);
      if (isExist === -1) state.bump = true;
    },
    changeCount: (state, action) => {
      const isExist = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.count <= 0) state.cartItems.splice(isExist, 1);
      else state.cartItems[isExist].count = action.payload.count;
    },
    emptyModalCart: (state) => {
      state.cartItems = [];
      state.bump = false;
    },
    orderCart: (state) => {
      state.checkOut = true;
    },
    placeOrder: (state) => {
      state.cartItems = [];
      state.ordered = true;
    },
    resetAfterOrder: (state) => {
      state.ordered = false;
      state.bump = false;
      state.checkOut = false;
    },
    resetBump(state) {
      state.bump = false;
    },
  },
});

export const {
  addToCart,
  changeCount,
  emptyModalCart,
  orderCart,
  initial,
  placeOrder,
  resetAfterOrder,
  resetBump,
} = cartState.actions;

///action creator
export const getCartData = () => {
  return (dispatch) => {
    const cartHistory = JSON.parse(localStorage.getItem("cartItems"));
    dispatch(initial(cartHistory === null ? [] : cartHistory));
  };
};

export const setCartData = (cartitems) => {
  return (dispatch) => {
    localStorage.setItem("cartItems", JSON.stringify(cartitems));
  };
};

export default cartState;
