import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartState from "./cart-slice";
import orderedState from "./ordered-slice";
import modalState from "./modal-slice";
import modalOrdersState from "./modalorders-slice";
import { devToolsEnhancer } from "@redux-devtools/extension";

const reducer = combineReducers({
  cart: cartState.reducer,
  orderedItems: orderedState.reducer,
  modal: modalState.reducer,
  orderModal: modalOrdersState.reducer,
});

const store = configureStore({ reducer: reducer }, devToolsEnhancer());

export default store;
