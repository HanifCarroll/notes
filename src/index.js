import React from "react";
import ReactDOM from "react-dom";
import { NotesModule } from "./modules/notes";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
ReactDOM.render(<NotesModule />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
