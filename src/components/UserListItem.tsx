import React from "react";
import {ListItemProps} from "./ListItemProps";
import {Button} from "primereact/button";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  scheduleAssign: (resource?: Resource, timeEntry?: Resource) => void;
  scheduleSetActiveResource: (resource: string) => void;
}

type Props = ListItemProps & DispatchProps;

export class UserListItem extends React.Component<Props, {}> {

  onAssign = () => {
    const {scheduleAssign, resource} = this.props;

    scheduleAssign(resource.get("id"));
  }

  onSetActive = () => {
    const {
      scheduleSetActiveResource,
      resource
    } = this.props;

    scheduleSetActiveResource(resource.get("id"));
  }

  render() {
    const { label } = this.props
    return (
      <div className="p-clearfix">
        <Button className="set-active" label={label} onClick={this.onSetActive} />
        <Button className="assign" label=">>" onClick={this.onAssign} />
      </div>
    );
  }
}
