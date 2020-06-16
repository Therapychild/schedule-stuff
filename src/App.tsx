import React from 'react';
import { BaseListBox } from "./components/BaseListBox";
import Sidebar from 'components/dist/common/Sidebar';
// import {ConnectedToggleButton as ToggleButton} from "./components/connected/ToggleButton";

import './App.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css"
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import "./styles/sidebar.css";
import "./styles/sidebar-toggle.css"
import "./styles/timeline.css"
import './index.css'

import {getAllUsers} from "./js/exampleData";
import {AssignableCard} from "./components/AssignableCard";

export interface OwnProps {
}

type modeType = "user" | "job";
type Props = OwnProps & StateProps;
export interface StateProps {
  mode: modeType;
}

export default class App extends React.Component<Props, {}> {
  static defaultProps = {
    className: ""
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      mode: this.props.mode ? "user" : "job"
    };
  }

  render() {
    const data = {data: {}, label: "Goodbye", value: "Yes!"};
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

    return (
      <div className="App">
        {/*<ToggleButton label="Toggle"/>*/}
        <AssignableCard data={data} expandable={false}/>
        <Sidebar>
        <BaseListBox
          activeGroup={""}
          groups={groups}
          viewMode={"job"}
          assignActive={() => {alert("You just assigned me!")}}
        />
      </Sidebar>
      </div>
    );
  }
}

