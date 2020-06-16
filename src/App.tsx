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

import {getAllUsers} from "./js/exampleData";
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
    const users = getAllUsers();
    const groups: any[] = [];

    // Need to reformat data to be shaped like a resource
    Object.keys(users).forEach((key: string) => {
      const item = users[key];
      groups.push({
        value: item.id,
        label: item.name,
        data: item
      })
    })
    const mode = "job";

    return (
      <div className="App">
        <ConnectedToggleButton label="Toggle" />
        <Sidebar>
        <BaseListBox
          activeGroup={""}
          groups={groups}
          viewMode={mode}
          assignActive={() => {alert("You just assigned me!")}}
        />
      </Sidebar>
      </div>
    );
  }
}

