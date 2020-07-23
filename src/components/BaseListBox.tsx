import React, {Component} from "react";
import {TMode} from "../types/mode";
import {ListBox} from "primereact/listbox";
import {ConnectedUserListItem} from "./connected/UserListItem";
import {ConnectedJobListItem} from "./connected/JobListItem";
import {ListItemProps} from "./ListItemProps";
import Resource from "duckies/dist/resource/Resource";

export interface StateProps {
  resources: Resource[];
  viewMode: TMode;
  activeResource: string;
}

export interface DispatchProps {
  scheduleSetActiveResource: (resource: string) => void;
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {

  doChange = (event: {originalEvent: Event, value: any, target: {name: string, id: string, value: string}}): void => {
    const { scheduleSetActiveResource } = this.props;

    scheduleSetActiveResource(event.value);
  }

  render(): React.ReactNode {
    const { resources, viewMode, activeResource } = this.props;
    let options: ListItemProps[] = [];

    /**
     * Format resources as options for the ListBox.
    */
    if (viewMode === "job") {
      Object.keys(resources).forEach((key: string, index: number) =>
      {
        const user: Resource = resources[key];
        options.push({
          value: user.get("id"),
          label: user.get("name"),
          resource: user
        })
      });
    }
    else {
      Object.keys(resources).forEach((key: string, index: number) =>
      {
        const job = resources[key];
        options.push({
          value: job.get("id"),
          label: job.get("name.name"),
          resource: job
        })
      });
    }

    let Template = viewMode === "job" ? ConnectedUserListItem : ConnectedJobListItem;

    return (
      <ListBox
        value={activeResource}
        filter={true}
        filterPlaceholder="Search"
        options={options}
        onChange={this.doChange}
        listStyle={{maxHeight: "50vh"}}
        itemTemplate={Template as React.JSXElementConstructor<any>}
      />
    );
  }
}
