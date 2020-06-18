import React from "react";
import {ListItemProps} from "./ListItemProps";
import {Button} from "primereact/button";

type Props = ListItemProps;

export class UserListItem extends React.Component<Props, {}> {
  static listItemTemplate(group: any): JSX.Element {
    const item = new UserListItem(group);
    return item.render();
  }

  render() {
    const {label, assignActive} = this.props
    return (
      <div className="p-clearfix">
        <span style={{fontSize:'1em',float:'right',margin:'1em .5em 0 0'}}>{label}</span>
        {/*button needs to be disabled by default, enabled when a time-entry becomes active*/}
        <Button className="assign" label="Assign user" onClick={assignActive} />
      </div>
    );
  }
}
