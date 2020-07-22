import React from "react";
import Sidebar from "components/dist/common/Sidebar";
import {ConnectedSchedule} from "./components/connected/Schedule";
import {ConnectedToggleButton} from "./components/connected/ToggleButton";
import {ConnectedBaseListBox} from "./components/connected/BaseListBox";

import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css"
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./styles/sidebar.css";
import "./styles/sidebar-toggle.css"
import "./styles/timeline.css"
import "./styles/demo.css"
import "./index.css"

export default class App extends React.Component<{}, {}> {

  render() {
    return (
      <div className="App">
        <ConnectedSchedule />
        <Sidebar>
          <ConnectedToggleButton className="view-mode-toggle" label="Toggle" />
          <ConnectedBaseListBox />
        </Sidebar>
      </div>
    );
  }
}
