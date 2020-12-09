import React, { useState } from "react";
import {
  AssignIds,
  activeIdsVar,
  assignIdsVar,
  timeEntriesArrayVar,
  viewModeVar,
} from "../util/apolloStore";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { SET_JOB, SET_USER } from "../util/clientSchema";
import { Card as TimeEntryCard } from "time-entry/dist/components/Card";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface Props {
  timeEntry: any;
}

/**
 * Composes an Item to display as a timeEntry on the Schedule's Timeline. The
 * TimeLineItem also composes a TimeEntryCard to display the timeEntry's extra
 * information.
 *
 * @param:
 *   props:
 *     timeEntry: A timeEntry object containing the information required to
 *       compose a TimeLineItem.
 *   viewModeVar: A Reactive variable used to set or retrieve the viewMode state.
 *   activeIdsVar: A Reactive variable used to set or retrieve the active entity
 *     information.
 *   assignIdsVar: A Reactive variable used to set or retrieve the assignable
 *     entity information.
 *   timeEntriesArrayVar: A Reactive variable used to set or retrieve the list
 *     of current timeEntries.
 *
 * @return ReactElement.
 */
export function TimeLineItem(props: Props): React.ReactElement {
  const { timeEntry } = props;
  const [scheduleViewTimeEntryId, setScheduleViewTimeEntryId] = useState(
    undefined
  );
  const activeIds = useReactiveVar(activeIdsVar);

  //
  let anyLoading = null;
  const [setJob, { loading: setJobLoading }] = useMutation(SET_JOB, {
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

  const [setUser, { loading: setUserLoading }] = useMutation(SET_USER, {
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
  if (anyLoading) return <CircularProgress />;

  const assignEntity = async ({
    entityId,
    entityName,
    entityType,
    timeEntryId,
  }: AssignIds): Promise<void> => {
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
      timeEntryId,
    });
  };

  /**
   *  Show the SetActive Button, only if it has a name to display.
   *  Sets the clicked timeEntryId to active, as well as the assigned entity if
   *  one exists.
   */
  const entityId =
    viewModeVar() === "job" ? timeEntry.user.uid : timeEntry.job.uid;
  const label =
    viewModeVar() === "job" ? timeEntry.user.username : timeEntry.job.name;
  const entityType = viewModeVar() === "job" ? "user" : "job";
  let setActive = <></>;

  if (entityId) {
    setActive = (
      <Button
        className="time-entry"
        onClick={() => {
          activeIdsVar({
            entityId,
            entityName: label,
            entityType,
            timeEntryId: timeEntry.uid,
          });
        }}
      >
        {label}
      </Button>
    );
  }

  const viewTimeEntryCard =
    scheduleViewTimeEntryId === timeEntry.uid ? (
      <TimeEntryCard className="" data={timeEntry} />
    ) : (
      <></>
    );

  const activeColor =
    activeIds.entityId === entityId ? { backgroundColor: "yellow" } : undefined;

  return (
    <div
      id={timeEntry.uid}
      className="time-entry-container"
    >
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
        }}
        disabled={activeIds.entityId === undefined}
      >
        Assign
      </Button>
      <Button
        className="more-info"
        style={activeColor}
        onClick={() => {
          scheduleViewTimeEntryId === timeEntry.uid
            ? setScheduleViewTimeEntryId(undefined)
            : setScheduleViewTimeEntryId(timeEntry.uid);
        }}
      >
        Info
      </Button>
      {viewTimeEntryCard}
    </div>
  );
}
