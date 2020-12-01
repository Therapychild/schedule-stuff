import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_IDS} from "../util/clientSchema";
import {ActiveIds, setToActiveIdsVar, } from "../util/apolloStore";
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
   * @todo: Need a mutation to assign a resource to a timeEntry
   */
  function onAssign(id: string) {
    // -Get the active timeEntry id from state.
    // -Get the timeEntry user/job id from the clicked item.
    // -Call assign Mutation to Send id's to database and assign the user/job to
    // the active timeEntry.
    // -Refresh.
  }

  /**
   * -Set the clicked TimeEntry to active.
   * -If an Entity is already assigned to it, the Entity becomes active as well.
   */
  const {data: activeIdsData} = useQuery(GET_ACTIVE_IDS);
  const activeTimeEntryId = activeIdsData.activeIds.timeEntryId;

  function scheduleSetActiveIds({timeEntryId, entityId}: ActiveIds) {
    setToActiveIdsVar({timeEntryId, entityId});
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
  const label = viewMode === "job" ? timeEntry.user.username : timeEntry.job.name;
  let setActive = <Button className="time-entry" onClick={() => {
        scheduleSetActiveIds({
          timeEntryId: timeEntry.uid,
          entityId: entityId
        })
      }}>
        {label}
      </Button>

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
