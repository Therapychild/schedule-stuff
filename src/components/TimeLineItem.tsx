import React from 'react';
import {
  setToActiveIdsVar,
  assignableIdsVar
} from "../util/apolloStore";
import {TMode} from "../util/types";
import {Card as TimeEntryCard} from "time-entry/dist/components/Card";
import Button from "@material-ui/core/Button"

export interface Props {
  timeEntry: any;
  viewMode: TMode;
  scheduleSetViewTimeEntry: Function;
}

export function TimeLineItem(props: Props) {
  const {timeEntry, viewMode, scheduleSetViewTimeEntry} = props;

  /**
   * -Set the clicked TimeEntry to active.
   * -If an Entity is already assigned to it, the Entity becomes active as well.
   */
  // View the data section of the timeEntry.
  function onViewTimeEntry(timeEntry: any) {
    scheduleSetViewTimeEntry({scheduleSetViewTimeEntry: timeEntry.id});
  }

  /**
   *  Show the SetActive Button, only if it has a name to display. This will
   *  always be true in "user" viewMode because every timeEntry must have a
   *  job assigned to it, not necessarily a user.
   */
  const entityId = viewMode === "job" ? timeEntry.user.uid : timeEntry.job.uid;
  const label = viewMode === "job" ? timeEntry.user.username : timeEntry.job.name;
  let setActive = <Button className="time-entry" onClick={() => {
    setToActiveIdsVar({timeEntryId: timeEntry.uid, entityId});
  }}>
    {label}
  </Button>

  return (
    <div id={timeEntry.uid}>
      {setActive}
      <Button
        className="assign"
        onClick={() => {
          assignableIdsVar({
            entityId: entityId,
            entityName: label,
            entityType: viewMode === "job" ? "user" : "job",
            timeEntryId: setToActiveIdsVar().timeEntryId
          });
        }}>
        Assign
      </Button>
      <Button className="more-info" onClick={() => {
        onViewTimeEntry(timeEntry.id);
      }}>
        Info
      </Button>
      <TimeEntryCard data={timeEntry}/>
    </div>
  );
}
