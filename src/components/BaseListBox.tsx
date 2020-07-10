import React, {Component} from "react";
import {TMode} from "../types/mode";
import {ListBox} from "primereact/listbox";
import {ConnectedUserListItem} from "./connected/UserListItem";
import {ConnectedJobListItem} from "./connected/JobListItem";
import {ListItemProps} from "./ListItemProps";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  scheduleSetActiveResource: (resource: string) => void;
}

export interface StateProps {
  resources: Resource[];
  viewMode: TMode;
  activeResource: string;
  activeTimeEntry: string;
}

type Props = StateProps & DispatchProps;

export class BaseListBox extends Component<Props, {}> {

  doChange = (event: {originalEvent: Event, value: any, target: {name: string, id: string, value: string}}): void => {
    const { scheduleSetActiveResource } = this.props;

    scheduleSetActiveResource(event.value);
  }

  render(): React.ReactNode {
    const { resources, activeResource, viewMode } = this.props;
    const itemTemplate = viewMode === "job" ? ConnectedUserListItem.listItemTemplate : ConnectedJobListItem.listItemTemplate;
    const options: ListItemProps[] = [];

    /**
     * Format resources as options for the ListBox.
    */
    resources.forEach((resource: any, index: number): void => {
      options.push({
        label: resource.get("name"),
        value: resource.get("id"),
        resource,
      })
    })

    return (
      <ListBox
        value={activeResource}
        filter={true}
        filterPlaceholder="Search"
        options={options}
        onChange={this.doChange}
        itemTemplate={itemTemplate}
        style={{width: "15em"}}
        listStyle={{maxHeight: "250px"}}
      />
    );
  }
}
