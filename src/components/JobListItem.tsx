import React from "react";
import {ListItemProps} from "./ListItemProps";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  // scheduleAssign: (resource?: Resource, timeEntry?: Resource) => void;
  scheduleSetActiveResource: (resource: string) => void;
}

type Props = ListItemProps & DispatchProps;

export class JobListItem extends React.Component<Props, {}> {

  onAssign = () => {
    // const {scheduleAssign, resource} = this.props;
    //
    // scheduleAssign(resource.get("id"));
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
      <>
        <Button className="set-to-active" variant="text" color="primary" size="small">
          {label}
        </Button>
        <Button className="assign-to" variant="text" color="primary" size="small" endIcon={<ChevronRight/>}/>
        {/*<Button className="set-active" label={label} onClick={this.onSetActive} />*/}
        {/*<Button className="assign" label=">>" onClick={this.onAssign} />*/}
      </>
    );
  }
}
