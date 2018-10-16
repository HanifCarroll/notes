import React from "react";
import ReactDOM from "react-dom";
import Home from "./features/Home/Home";
import Load from "./features/Home/Load";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Load />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
