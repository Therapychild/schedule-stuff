import React from "react";
import {ListItemProps} from "./ListItemProps";
import {Button} from "primereact/button";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  scheduleAssign: (resource?: Resource, timeEntry?: Resource) => void;
  scheduleSetActiveResource: (resource: string) => void;
}

type Props = ListItemProps & DispatchProps;

export class JobListItem extends React.Component<Props, {}> {
  /**
   * ListBox requires a template
   */
  static listItemTemplate(group: any): JSX.Element {
    const item = new JobListItem(group);
    return item.render();
  }

  onAssign() {
    const {scheduleAssign, resource} = this.props;

    scheduleAssign(resource.get("id"));
  }

  onSetActive() {
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
        <Button style={{fontSize:'1em',float:'right',margin:'1em .5em 0 0'}} label={label} onClick={this.onSetActive} />
        <Button className="assign" label="Assign" onClick={this.onAssign} />
      </div>
    );
  }
}
