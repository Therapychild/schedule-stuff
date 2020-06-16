import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import SetActiveGroup from "./action_managers/resource/SetActiveGroup";
/** Module not found: Can't resolve 'core-js/modules/es6.array.for-each' in
 * '/home/jeremy/Projects/antoinesolutions/custom-node-modules/schedule-crapp/
 * node_modules/duckies/dist/action_registries'
 */
import ReducingActionRegistry from "duckies/dist/action_registries/ReducingActionRegistry";
import ActionRegistry from "duckies/dist/action_registries/ActionRegistry";

const actionRegistry = new ReducingActionRegistry(
  new ActionRegistry()
);

const store = createStore(actionRegistry.reducer);

actionRegistry.register(SetActiveGroup);

store.dispatch({ type: "@duckies/initialize" });


// mode={"job"}
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
   </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
