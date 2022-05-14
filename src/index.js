import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { CartcontextProvider } from "./components/contexts/CartContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <CartcontextProvider>
//     <App />
//   </CartcontextProvider>
// );

import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
