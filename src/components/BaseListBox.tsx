import React from "react";
import {TMode} from "../types/mode";
import {ListBox} from "primereact/listbox";
import {ConnectedUserListItem} from "./connected/UserListItem";
import {ConnectedJobListItem} from "./connected/JobListItem";
import {ListItemProps} from "./ListItemProps";
import Resource from "duckies/dist/resource/Resource";

// @Todo remove
import {getJobResources, getUserResources} from "../js/resources";
// @Todo remove

export interface DispatchProps {
  scheduleSetActiveResource: (resource: string) => void;
}

export interface StateProps {
  // resources: Resource[];
  viewMode: TMode;
  activeResource: string;
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends React.Component<Props, {}> {

  // Pass the value of the clicked group to the scheduleActiveGroup function.
  doChange = (event: {originalEvent: Event, value: any, target: {name: string, id: string, value: string}}): void => {
    const { scheduleSetActiveResource } = this.props;

    scheduleSetActiveResource(event.value);
  }

  render(): React.ReactNode {
    // const { activeResource, viewMode, scheduleSetActiveResource } = this.props;
    const { viewMode, activeResource } = this.props;
    // Data will eventually be retrieved from state as props.
    const users: any = getUserResources();
    let userResources: ListItemProps[] = [];

    Object.keys(users).forEach((key) =>
    {
      const group: Resource = users[key];
      userResources.push({
        value: group.get("id"),
        label: group.get("name"),
        resource: group
      })
    });

    const jobs: any = getJobResources();
    let jobResources: ListItemProps[] = [];

    Object.keys(jobs).forEach((key) =>
    {
      const group = jobs[key];
      jobResources.push({
        value: group.get("id"),
        label: group.get("name.name"),
        resource: group
      })
    });

    let resources = viewMode === "job" ? userResources : jobResources;
    let Template = viewMode === "job" ? ConnectedUserListItem : ConnectedJobListItem;

    return (
      <ListBox
        value={activeResource}
        filter={true}
        filterPlaceholder="Search"
        options={resources}
        onChange={this.doChange}
        listStyle={{maxHeight: "50vh"}}
        itemTemplate={Template as React.JSXElementConstructor<any>}
      />
    );
  }
}
