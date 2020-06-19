import React, {Component} from "react";
import {ListBox} from "primereact/listbox";
import {UserListItem} from "./UserListItem";
import {JobListItem} from "./JobListItem";
import {ListItemProps} from "./ListItemProps";
import cloneDeep from "lodash/cloneDeep";

export interface DispatchProps {
  assignActive: Function;
}

export interface StateProps {
  scheduleActiveGroup: string;
  groups: ListItemProps[];
  viewMode: "user" | "job";
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {
  onChange(event: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void {
    //setScheduleActiveGroup, (dispatchProp)
  }

  render(): React.ReactNode {
    const { scheduleActiveGroup, viewMode, groups, assignActive } = this.props;
    const itemTemplate = viewMode === "job" ? UserListItem.listItemTemplate : JobListItem.listItemTemplate;
    const newGroups = cloneDeep(groups);

    // Add the assignActive prop to the group objects
    newGroups.forEach((value: any, index: number): void => {
      newGroups[index].assignActive = assignActive as any;
    })

    return (
      <ListBox
        value={scheduleActiveGroup}
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

