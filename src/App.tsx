import React from "react";
import { ConnectedBaseListBox } from "./components/connected/BaseListBox";
import Sidebar from "components/dist/common/Sidebar";
import { ConnectedToggleButton } from "./components/connected/ToggleButton";
import TimeLine from "react-calendar-timeline";

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
    const {groups, items} = this.props;

    return (
      <div className="App">
        <ConnectedToggleButton label="Toggle" />
        <TimeLine groups={groups} items={items}/>
        <Sidebar>
        <ConnectedBaseListBox />
      </Sidebar>
      </div>
    );
  }
}

