import React, {Component} from "react";
import {TMode} from "../types/mode";
import {ListBox} from "primereact/listbox";
import {UserListItem} from "./UserListItem";
import {JobListItem} from "./JobListItem";
import {ListItemProps} from "./ListItemProps";
import Resource from "duckies/dist/resource/Resource";
import {scheduleSetActiveGroup} from "../action_managers/resource/ScheduleSetActiveGroup";

// @Todo remove
import {getJobResources, getUserResources} from "../js/resources";
// @Todo remove

export interface DispatchProps {
  scheduleSetActiveGroup: Function;
  scheduleAssign: Function;
}

export interface StateProps {
  groups: ListItemProps[];
  viewMode: TMode;
  activeGroup: Resource;
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {

  // Pass the value of the clicked group to the scheduleActiveGroup function.
  onChange(event: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void {
    const { scheduleSetActiveGroup } = this.props;
    scheduleSetActiveGroup(event.value);
  }

  render(): React.ReactNode {
    const { activeGroup, scheduleAssign, viewMode } = this.props;
    // @Todo remove
    // Data will eventually be retrieved from state as props.
    const users: any = getUserResources();
    let userResources: any[] = [];

    Object.keys(users).forEach((key) =>
    {
      const group = users[key];
      userResources.push({
        value: group.get("id"),
        label: group.get("displayName"),
        data: group
      })
    });
    /**
     * Add the scheduleAssign and scheduleActiveGroup props to the user/job
     * groups object.
     */
    userResources.forEach((value: any, index: number): void => {
      userResources[index].scheduleAssign = scheduleAssign as any;
      userResources[index].scheduleSetActiveGroup = scheduleSetActiveGroup as any;
    })

    const jobs: any = getJobResources();
    let jobResources: any[] = [];

    Object.keys(jobs).forEach((key) =>
    {
      const group = jobs[key];
      jobResources.push({
        value: group.get("id"),
        label: group.get("name.name"),
        data: group
      })
    });
    // @Todo remove

    const itemTemplate = viewMode === "job" ? UserListItem.listItemTemplate : JobListItem.listItemTemplate;
    const groups = viewMode === "job" ? userResources : jobResources;

    return (
      <ListBox
        value={activeGroup}
        filter={true}
        filterPlaceholder="Search"
        options={groups}
        onChange={this.onChange}
        itemTemplate={itemTemplate}
        style={{width: "15em"}}
        listStyle={{maxHeight: "250px"}}
      />
    );
  }
}
