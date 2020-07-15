import React from "react";
import {ConnectedToggleButton} from "./components/connected/ToggleButton";
import Sidebar from "components/dist/common/Sidebar";
import {ConnectedBaseListBox} from "./components/connected/BaseListBox";
import {ConnectedSchedule} from "./components/connected/Schedule";

import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css"
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./styles/sidebar.css";
import "./styles/sidebar-toggle.css"
import "./styles/timeline.css"
import "./index.css"

export default class App extends React.Component<{}, {}> {

  render() {
    const viewMode = "user";
    return (
      <div className="App">
        <ConnectedToggleButton label="Toggle" />
        <ConnectedSchedule />
        <Sidebar>
        <ConnectedBaseListBox />
      </Sidebar>
      </div>
    );
  }
}

