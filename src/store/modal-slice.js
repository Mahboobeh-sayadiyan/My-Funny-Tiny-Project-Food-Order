import { createSlice } from "@reduxjs/toolkit";
const modalState = createSlice({
  name: "cart",
  initialState: { showModal: false },
  reducers: {
    hideModalCart(state) {
      state.showModal = false;
    },
    showModalCart(state) {
      state.showModal = true;
    },
  },
});

export const { hideModalCart, showModalCart } = modalState.actions;

export const sendcartData = (cart) => {
  return async (dispatch) => {};
};

export default modalState;
