import React from "react";
import {ListItemProps} from "./ListItemProps";
import {Button} from "primereact/button";

type Props = ListItemProps;

export class JobListItem extends React.Component<Props, {}> {
  static listItemTemplate(group: any): JSX.Element {
    const item = new JobListItem(group);
    return item.render();
  }

  render() {
    const { label, scheduleSetActiveGroup, scheduleAssign } = this.props
    return (
      <div className="p-clearfix">
        <Button style={{fontSize:'1em',float:'right',margin:'1em .5em 0 0'}} label={label} onClick={scheduleSetActiveGroup} />
        <Button className="assign" label="Assign" onClick={scheduleAssign} />
      </div>
    );
  }
}
