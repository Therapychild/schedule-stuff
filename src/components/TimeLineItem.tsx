import React from 'react';
import Button from "@material-ui/core/Button"
import {Card as TimeEntryCard} from "time-entry/dist/components/Card";
import {TMode} from "../types/types";
import {ActiveIds, setToActiveVar, } from "../util/apolloStore";

export interface Props {
  timeEntry: any;
  viewMode: TMode;
  scheduleSetViewTimeEntry: Function;
}

export function TimeLineItem(props: Props) {
  const {timeEntry, viewMode, scheduleSetViewTimeEntry} = props;

  /**
   * @todo: Need a mutation to assign a resource to a timeEntry
   */
  function onAssign(id: string) {
    // -Get the active timeEntry id from state.
    // -Get the timeEntry user/job id from the clicked item.
    // -Call assign Mutation to Send id's to database and assign the user/job to
    // the active timeEntry.
    // -Refresh.
    alert("assigned");
  }

  /**
   * -Set the clicked timeEntry to active.
   * -If an Entity is already assigned to it, the Entity becomes active as well.
   */
  const scheduleSetActiveIds = ({timeEntryId, entityId}: ActiveIds) => {
    setToActiveVar({timeEntryId, entityId});
  }

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
  let setActive = <></>;

  if (viewMode === "job") {
    if (timeEntry.user.uid) {
      setActive = <Button className="time-entry" onClick={() => {
        scheduleSetActiveIds({
          timeEntryId: timeEntry.uid,
          entityId: timeEntry.user.uid
        })
      }}>
        {timeEntry.user.username}
      </Button>
    }
  } else {
    setActive = <Button className="time-entry" onClick={() => {
      scheduleSetActiveIds({timeEntryId: timeEntry.uid})
    }}>
      {timeEntry.job.name}
    </Button>
  }

  return (
    <div id={timeEntry.uid}>
      {setActive}
      <Button className="assign" onClick={() => {
        onAssign(entityId)
      }}>
        Assign
      </Button>
      <Button className="more-info" onClick={() => {
        onViewTimeEntry(timeEntry.id)
      }}>
        Info
      </Button>
      <TimeEntryCard data={timeEntry}/>
    </div>
  );
}
