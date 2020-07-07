import React from 'react';
import {Button} from "primereact/button";
import TimeEntryCard from "time-entry/dist/components/Card";
import {TMode} from "../types/mode";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  scheduleSetActiveGroup: (group: string) => void;
  scheduleSetActiveTimeEntry: (timeEntry: Resource) => void;
  scheduleAssign: (group: Resource, timeEntry: Resource) => void;
  scheduleViewTimeEntry: (timeEntry: Resource) => void;
}

export interface OwnProps {
  timeEntry: Resource;
}

export interface StateProps {
  viewMode: TMode;
  activeGroup: Resource;
}

type Props = OwnProps & StateProps & DispatchProps;

export class TimeLineItem extends React.Component<Props, {}> {

  onSetActive() {
    const {scheduleSetActiveTimeEntry, scheduleSetActiveGroup, timeEntry, viewMode} = this.props;
    scheduleSetActiveTimeEntry(timeEntry.get("id"));

    // @todo When data structure is fixed, add .id to the user and job.
    if (viewMode === "job") {
      scheduleSetActiveGroup(timeEntry.get("user"));
    }
    else {
      scheduleSetActiveGroup(timeEntry.get("job"));
    }
  }

  onAssign() {
    const {scheduleAssign, timeEntry, activeGroup} = this.props;
    scheduleAssign(activeGroup, timeEntry);
  }

  onViewTimeEntry() {
    const {scheduleViewTimeEntry, timeEntry} = this.props;
    scheduleViewTimeEntry(timeEntry.get("id"));
  }

  render(): React.ReactNode {
    const {
      timeEntry,
      viewMode
    } = this.props;
    const id = timeEntry.get("id");
    let setActive = <></>;

    if (viewMode === "job") {
      const user = timeEntry.get("user");
      if (user) {
        setActive = <Button className="time-entry" onClick={this.onSetActive} label={timeEntry.get("user.displayName")} />
      }
    }
    else {
      setActive = <Button className="time-entry" onClick={this.onSetActive} label={timeEntry.get("job.name")} />
    }

    return (
      <div id={id} >
        {setActive}
        <Button className="assign" label="Assign" onClick={this.onAssign} />
        <Button className="more-info" label="info" onClick={this.onViewTimeEntry} />
        <TimeEntryCard data={timeEntry}/>
      </div>
    );
  }
}
