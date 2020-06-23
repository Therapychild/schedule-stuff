import React, {Component} from "react";
import {ListBox} from "primereact/listbox";
import {UserListItem} from "./UserListItem";
import {JobListItem} from "./JobListItem";
import {ListItemProps} from "./ListItemProps";
import cloneDeep from "lodash/cloneDeep";

export interface DispatchProps {
  scheduleSetActiveGroup: Function;
  scheduleAssign: Function;
}

export interface StateProps {
  groups: ListItemProps[];
  viewMode: "user" | "job";
  activeGroup:  ""
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {

  // Take the value of the item clicked and pass it to the scheduleActiveGroup function.
  onChange(event: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void {
    const { scheduleSetActiveGroup } = this.props;
    scheduleSetActiveGroup(event.value);
  }

  render(): React.ReactNode {
    const { activeGroup, scheduleAssign, viewMode, groups } = this.props;
    const itemTemplate = viewMode === "job" ? UserListItem.listItemTemplate : JobListItem.listItemTemplate;
    const newGroups = cloneDeep(groups);

    newGroups.forEach((value: any, index: number): void => {
      newGroups[index].scheduleAssign = scheduleAssign as any;
    })

    return (
      <ListBox
        value={activeGroup}
        filter={true}
        filterPlaceholder="Search"
        options={newGroups}
        onChange={this.onChange}
        itemTemplate={itemTemplate}
        style={{width: "15em"}}
        listStyle={{maxHeight: "250px"}}
      />
    );
  }
}

