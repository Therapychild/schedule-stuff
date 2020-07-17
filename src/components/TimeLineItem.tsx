import React from 'react';
import {Button} from "primereact/button";
import {Card as TimeEntryCard} from "time-entry/dist/components/Card";
import {TMode} from "../types/mode";
import Resource from "duckies/dist/resource/Resource";

export interface DispatchProps {
  // scheduleAssign: (resource?: Resource, timeEntry?: Resource) => void;
  // scheduleSetActiveResource: (timeEntry: string) => void;
  // scheduleSetActiveTimeEntry: (timeEntry: string) => void;
  scheduleViewTimeEntry: (timeEntry: string) => void;
}

export interface OwnProps {
  timeEntry: Resource;
}

export interface StateProps {
  viewMode: TMode;
  // activeResource: string;
  activeTimeEntry: string;
  viewedTimeEntry: string;
  isActive: boolean;
  isViewed: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

export class TimeLineItem extends React.Component<Props, {}> {

  /**
   * Sends the clicked timeEntry to have the activeResource assigned to it.
   */
  onAssign = () => {
    // const {scheduleAssign, timeEntry} = this.props;
    //
    // scheduleAssign(timeEntry);
  }

  /**
   * The timeEntry is set to activeTimeEntry.
   * If a resource is already assigned to the timeEntry, it is set to the
   * activeResource.
   */
  onSetActive = () => {
    const {
      // scheduleSetActiveResource,
      // scheduleSetActiveTimeEntry,
      timeEntry,
      // viewMode
    } = this.props;

    // if (timeEntry.get(`${viewMode}.id`)) {
    //   scheduleSetActiveResource(timeEntry.get(`${viewMode}.id`));
    //   scheduleSetActiveTimeEntry(timeEntry.get("id"));
    // }
    // else {
    //   scheduleSetActiveTimeEntry(timeEntry.get("id"));
    // }
  }

  onViewTimeEntry = () => {
    const {scheduleViewTimeEntry, timeEntry, isViewed} = this.props;

    scheduleViewTimeEntry(isViewed ? "" : timeEntry.get("id"));
  }

  render(): React.ReactNode {
    const {
      timeEntry,
      viewMode,
      viewedTimeEntry,
      isActive,
      isViewed
    } = this.props;
    const id = timeEntry.get("id");
    let setActive = <></>;

    /**
     *  Show the SetActive Button, only if it has a name to display. This will
     *  always be true in "user" viewMode because every timeEntry must have a
     *  job assigned to it, not necessarily a user.
     */
    // This isn't correct, fix this? should not return null, but?
    if (!timeEntry.get("job")) {
      return null;
    }

    if (viewMode === "job") {
      const user = timeEntry.get("user");

      if (user) {
        setActive = <Button className="set-active" onClick={this.onSetActive} label={timeEntry.get("user.name")} />
      }
    }
    else {
      setActive = <Button className="set-active" onClick={this.onSetActive} label={timeEntry.get("job.name")} />
    }

    let timeEntryCard= <></>;
    if (isViewed) {
      timeEntryCard = <TimeEntryCard data={timeEntry}/>
    }

    // add || isActive to overflow when active is available;
    return (
      <div id={id} className="time-line-item" style={{overflow: isViewed ? "visible" : "hidden"}}>
        {setActive}
        <Button className="assign" label="Assign" onClick={this.onAssign} />
        <Button className="more-info" label="Info" onClick={this.onViewTimeEntry} />
        {timeEntryCard}
      </div>
    );
  }
}
