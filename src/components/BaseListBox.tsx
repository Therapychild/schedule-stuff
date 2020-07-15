import React, {Component} from "react";
import {TMode} from "../types/mode";
import {ListBox} from "primereact/listbox";
import {UserListItem} from "./UserListItem";
import {JobListItem} from "./JobListItem";
import {ListItemProps} from "./ListItemProps";
import Resource from "duckies/dist/resource/Resource";

// @Todo remove
import {getJobResources, getUserResources} from "../js/resources";
// @Todo remove

export interface DispatchProps {
  // scheduleSetActiveResource: (resource: string) => void;
}

export interface StateProps {
  // resources: Resource[];
  viewMode: TMode;
  // activeResource: string;
//   activeTimeEntry: string;
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {

  // Pass the value of the clicked group to the scheduleActiveGroup function.
  doChange = (event: {originalEvent: Event, value: any, target: {name: string, id: string, value: string}}): void => {
    // const { scheduleSetActiveResource } = this.props;
    //
    // scheduleSetActiveResource(event.value);
  }

  render(): React.ReactNode {
    // const { activeResource, viewMode, scheduleSetActiveResource } = this.props;
    const { viewMode } = this.props;
    // @Todo remove
    // Data will eventually be retrieved from state as props.
    const users: any = getUserResources();
    let userResources: any[] = [];

    Object.keys(users).forEach((key) =>
    {
      const group: Resource = users[key];
      userResources.push({
        value: group.get("id"),
        label: group.get("name"),
        resource: group
      })
    });
    /**
     * Add the scheduleAssign and scheduleActiveGroup props to the user/job
     * groups object.
     */
    // userResources.forEach((value: any, index: number): void => {
    //   userResources[index].scheduleSetActiveResource = scheduleSetActiveResource as (resource: string) => void
    // })

    const jobs: any = getJobResources();
    let jobResources: any[] = [];

    Object.keys(jobs).forEach((key) =>
    {
      const group = jobs[key];
      jobResources.push({
        value: group.get("id"),
        label: group.get("name.name"),
        resource: group
      })
    });
    // @Todo remove

    const itemTemplate = viewMode === "job" ? UserListItem.listItemTemplate : JobListItem.listItemTemplate;
    const groups = viewMode === "job" ? userResources : jobResources;

    return (
      <ListBox
        value={"Hello"}
        filter={true}
        filterPlaceholder="Search"
        options={groups}
        onChange={this.doChange}
        itemTemplate={itemTemplate}
        style={{width: "15em"}}
        listStyle={{maxHeight: "250px"}}
      />
    );
  }
}
