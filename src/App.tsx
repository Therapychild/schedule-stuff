import React from "react";
import AppBar from "./components/AppBar";
import Sidebar from "components/dist/common/Sidebar";
import {ConnectedSchedule} from "./components/connected/Schedule";
import {ConnectedToggleButton} from "./components/connected/ToggleButton";
import {ConnectedBaseListBox} from "./components/connected/BaseListBox";
import CssBaseline from '@material-ui/core/CssBaseline';

import "./index.css"
import "fontsource-roboto/300.css"
import "fontsource-roboto/400.css"
import "fontsource-roboto/500.css"
import "fontsource-roboto/700.css"
import "material-icons-font/material-icons-font.css"

export default class App extends React.Component<{}, {}> {

  render() {
    return (
      <>
        <CssBaseline />
        <div className="App">
          <AppBar />
          <div className="schedule-window">
            <ConnectedSchedule />
            <Sidebar>
              <ConnectedToggleButton className="view-mode-toggle" label="Toggle" />
              <ConnectedBaseListBox />
            </Sidebar>
          </div>
        </div>
      </>
    );
  }
}
