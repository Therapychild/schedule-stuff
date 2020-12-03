import React, {useState} from 'react';
import {
  AssignIds,
  activeIdsVar,
  assignIdsVar,
  timeEntriesArrayVar,
  viewModeVar,
} from "../util/apolloStore";
import {Card as TimeEntryCard} from "time-entry/dist/components/Card";
import Button from "@material-ui/core/Button"
import {ApolloError, useMutation, useReactiveVar} from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import {SET_JOB, SET_USER} from "../util/clientSchema";

export interface Props {
  // @todo: When typing the timeEntry as a TimeEntry, the data field in the
  // Card component throws an error about missing a "status" prop. Either add a
  // status prop to the timeEntry Object, or make the Card status prop not
  // required.
  timeEntry: any;
}

export function TimeLineItem(props: Props) {
  const {timeEntry} = props;
  const [scheduleViewTimeEntryId, setScheduleViewTimeEntryId] = useState(undefined);
  // const assignIds = useReactiveVar(assignIdsVar);
  const activeIds = useReactiveVar(activeIdsVar);

  let anyLoading = null;
  const [setJob, {loading: setJobLoading}] = useMutation(SET_JOB, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.setJob);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on setJob Mutation, Schedule.tsx", error);
    },
  });
  if (setJobLoading) {
    anyLoading = setJobLoading;
  }

  const [setUser, {loading: setUserLoading}] = useMutation(SET_USER, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.setUser);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on setUser Mutation, Schedule.tsx", error);
    },
  });
  if (setUserLoading) {
    anyLoading = setUserLoading;
  }
  if (anyLoading) return <CircularProgress/>;

  const assignEntity = async ({entityId, entityName, entityType, timeEntryId}: AssignIds): Promise<void> => {
    if (entityType === "job") {
      await setJob({
        variables: {
          jobId: entityId,
          jobName: entityName,
          entityType,
          timeEntryId,
        },
      });
    } else if (entityType === "user") {
      await setUser({
        variables: {
          userId: entityId,
          username: entityName,
          entityType,
          timeEntryId,
        },
      });
    }
    assignIdsVar({
      entityId,
      entityName,
      entityType,
      timeEntryId
    });
  }

  /**
   *  Show the SetActive Button, only if it has a name to display.
   *  Sets the clicked timeEntryId to active, as well as the assigned entity if
   *  one exists.
   */
  const entityId = viewModeVar() === "job" ? timeEntry.user.uid : timeEntry.job.uid;
  const label = viewModeVar() === "job" ? timeEntry.user.username : timeEntry.job.name;
  const entityType = viewModeVar() === "job" ? "user" : "job";
  let setActive = <></>

  if (entityId) {
    setActive = <Button className="time-entry" onClick={() => {
      activeIdsVar({
        entityId,
        entityName: label,
        entityType,
        timeEntryId: timeEntry.uid
      });
      console.log("SetActive, TimeLineItem", activeIdsVar());
    }}>
      {label}
    </Button>
  }

  const viewTimeEntryCard = scheduleViewTimeEntryId === timeEntry.uid ?
    <TimeEntryCard className="" data={timeEntry}/> :
    <></>;

  console.log("Rendering TimeLineItem.tsx");
  return (
    <div id={timeEntry.uid} className="time-entry-container">
      {setActive}
      <Button
        className="assign"
        onClick={async () => {
          await assignEntity({
            entityId: activeIds.entityId,
            entityName: activeIds.entityName,
            entityType: activeIds.entityType,
            timeEntryId: timeEntry.uid,
          });
          console.log("SetActive, TimeLineItem", assignIdsVar());
        }}
        disabled={activeIds.entityId === undefined}
      >
        Assign
      </Button>
      <Button className="more-info" onClick={() => {
        scheduleViewTimeEntryId === timeEntry.uid ?
          setScheduleViewTimeEntryId(undefined) :
          setScheduleViewTimeEntryId(timeEntry.uid);
      }}>
        Info
      </Button>
      {viewTimeEntryCard}
    </div>
  );
}
