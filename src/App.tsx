import React from "react";
import { BaseListBox } from "./components/BaseListBox";
import Sidebar from "components/dist/common/Sidebar";
import { ConnectedToggleButton } from "./components/connected/ToggleButton";

import "./App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css"
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import "./styles/sidebar.css";
import "./styles/sidebar-toggle.css"
import "./styles/timeline.css"
import "./index.css"

import Resource from "duckies/dist/resource/Resource";

export default class App extends React.Component<{}, {}> {
  static defaultProps = {
    className: "",
  };

  render() {
    const data = new Resource(
      {
        id: "1",
        type: "timeEntry"
      },
      () => {}
    );

    const mode = "job";

    return (
      <div className="App">
        <ConnectedToggleButton label="Toggle" />
        <Sidebar>
        <BaseListBox
          scheduleActiveGroup={""}
          groups={groups}
          viewMode={mode}
          assignActive={() => {alert("You just assigned me!")}}
        />
      </Sidebar>
      </div>
    );
  }
}

