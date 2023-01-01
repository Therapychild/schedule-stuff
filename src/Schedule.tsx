import React, {Component} from 'react';

import './App.css';
import "primereact/resources/themes/nova-light/theme.css"
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import { ConnectedBaseListBox } from "./components/connected/BaseListBox";
const jobs = require("../js/jobs");
const users = require("../js/users");

export default class Schedule extends Component<{}, {}> {
  render() {
    return (
      <div className="Schedule">
        {/*<header className="Schedule-header">*/}
        {/*  <div>Schedule</div>*/}
        {/*</header>*/}
        {/*<ConnectedBaseListBox />*/}
      </div>
    );
  }
}

