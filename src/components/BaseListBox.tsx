import React from 'react';
import { ListBox } from 'primereact/listbox';
import { UserListItem } from "./UserListItem";
import { JobListItem } from "./JobListItem";

export interface DispatchProps {
  setActiveGroup: (activeGroup: string) => void;
}

export interface StateProps {
  activeGroup: string;
  groups: any;
  viewMode: "user" | "job";
}

type Props = StateProps & DispatchProps;

export default class BaseListBox extends React.Component<Props, {}> {
  render(): React.ReactNode {
    const { activeGroup, groups, viewMode } = this.props;
    const itemTemplate = viewMode === "user" ? UserListItem.listItemTemplate : JobListItem.listItemTemplate;

    return (
      <div>
        <h3>Groups</h3>
        <ListBox
          value={activeGroup}
          filter={true}
          options={groups}
          onChange={(e) => this.setState({activeGroup: e.value})}
          itemTemplate={itemTemplate}
        />
      </div>
    );
  }
}
