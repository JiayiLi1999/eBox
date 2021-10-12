import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./constants/main.css";

import { Provider } from "react-redux";
import {store} from "./redux/store";


// App imports.
import BaseLayout from "./components/BaseLayout";
// const baseComponent = ReactDOM.render(<BaseLayout />, document.body);

const rootElement = document.getElementById("root");

// Render the UI.
ReactDOM.render(
  <Provider store={store}>
    <BaseLayout />
  </Provider>,
    rootElement
);

