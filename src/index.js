import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import AppTodo from "./todo/components/AppTodo";
import { createStore } from "redux";
import todoApp from "./todo/reducers";
import { loadState, saveState } from "./todo/localstorage";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = createStore(todoApp, persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <AppTodo />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
