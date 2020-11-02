import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketApplication } from "./socket";
import { Context } from "./socket/context";
import reportWebVitals from "./reportWebVitals";
const chat = new SocketApplication();

ReactDOM.render(
  <Context.Provider value={chat}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
