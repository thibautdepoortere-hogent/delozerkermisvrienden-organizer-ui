import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "es5-shim";
import "es6-shim";
// import "core-js/es/map";
// import "core-js/es/set";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./css/index.css";
import "./css/index-smaller.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

ReactDOM.render(
  //<BrowserRouter>
  <App />,
  //</BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
