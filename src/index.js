import React from "react";
import { render } from "react-dom";
import "./app/index.css";
import App from "./app";
import { store } from "./app/store";
import { Provider } from "react-redux";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
