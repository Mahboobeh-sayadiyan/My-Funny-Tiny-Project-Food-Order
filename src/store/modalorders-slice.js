import { createSlice } from "@reduxjs/toolkit";
const modalOrdersState = createSlice({
  name: "cart",
  initialState: { showOrdersModal: false },
  reducers: {
    hideModalorder(state) {
      state.showOrdersModal = false;
    },
    showModalorder(state) {
      state.showOrdersModal = true;
    },
  },
});

export const { hideModalorder, showModalorder } = modalOrdersState.actions;

export const sendcartData = (cart) => {
  return async (dispatch) => {};
};

export default modalOrdersState;
