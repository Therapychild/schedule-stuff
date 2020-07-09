import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "./index.css";

import {ScheduleAssign} from "./action_managers/resource/ScheduleAssign";
import {ScheduleToggleViewMode} from  "./action_managers/resource/ScheduleToggleViewMode";
import KeyValue from "duckies/dist/action_managers/utility/KeyValue";

import ReducingActionRegistry from "duckies/dist/action_registries/ReducingActionRegistry";
import ActionRegistry from "duckies/dist/action_registries/ActionRegistry";

const actionRegistry = new ReducingActionRegistry(
  new ActionRegistry()
);

const store = createStore(actionRegistry.reducer);
window.store = store;

actionRegistry.register(ScheduleAssign);
actionRegistry.register(ScheduleToggleViewMode);
actionRegistry.register(KeyValue);

store.dispatch({ type: "@duckies/initialize" });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
