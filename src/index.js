import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "./index.css";

import {ScheduleSetActiveTimeEntry} from "./action_managers/resource/ScheduleSetActiveTimeEntry";
import {ScheduleSetActiveGroup} from "./action_managers/resource/ScheduleSetActiveGroup";
import {ScheduleToggleViewMode} from  "./action_managers/resource/ScheduleToggleViewMode";
import {ScheduleViewTimeEntry} from "./action_managers/resource/ScheduleViewTimeEntry";

import ReducingActionRegistry from "duckies/dist/action_registries/ReducingActionRegistry";
import ActionRegistry from "duckies/dist/action_registries/ActionRegistry";

const actionRegistry = new ReducingActionRegistry(
  new ActionRegistry()
);

const store = createStore(actionRegistry.reducer);
window.store = store;

actionRegistry.register(ScheduleSetActiveTimeEntry);
actionRegistry.register(ScheduleSetActiveGroup);
actionRegistry.register(ScheduleToggleViewMode);
actionRegistry.register(ScheduleViewTimeEntry);

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
