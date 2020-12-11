import React from "react";
import { TimeLineItem } from "./TimeLineItem";
import { ApolloError, useMutation } from "@apollo/client";
import { SET_USER } from "../util/clientSchema";
import {
  TimeEntry,
  activeIdsVar,
  assignIdsVar,
  timeEntriesArrayVar,
} from "../util/apolloStore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export interface Props {
  timeEntry: TimeEntry;
}

/**
 * Composes a TimeLineItem to display as a timeEntry on the Schedule's Timeline,
 * and builds a "Set Active" button to pass to the TimeLineItem if there is an
 * assigned entity.
 *
 * @param:
 *   props:
 *     timeEntry: A timeEntry object containing the information required to
 *       compose a TimeLineItem.
 *   activeIdsVar: A Reactive variable used to set or retrieve the active entity
 *     information.
 *   assignIdsVar: A Reactive variable used to set or retrieve the assignable
 *     entity information.
 *   timeEntriesArrayVar: A Reactive variable used to set or retrieve the list
 *     of current timeEntries.
 *
 * @return React.ReactElement
 */
export function UserTimeLineItem(props: Props) {
  const { timeEntry } = props;

  /**
   * Graphql Mutation
   */
  const [setUser, { loading }] = useMutation(SET_USER, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.setUser);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on setUser Mutation, Schedule.tsx", error);
    },
  });
  if (loading) return <CircularProgress />;

  /**
   *  Show the SetActive Button, only if it has a name to display.
   *  Sets the clicked timeEntryId to active, as well as the assigned entity if
   *  one exists.
   */
  let setActiveButton = <></>;

  if (timeEntry.user.uid) {
    setActiveButton = (
      <Button
        className="set-active"
        onClick={() => {
          activeIdsVar({
            entityId: timeEntry.user.uid ? timeEntry.user.uid : activeIdsVar().entityId,
            entityName: timeEntry.user.username,
            entityType: "user",
            timeEntryId: timeEntry.uid,
          });
        }}
      >
        {timeEntry.user.username}
      </Button>
    );
  }

  const assignEntity = async (): Promise<void> => {
    await setUser({
      variables: {
        userId: activeIdsVar().entityId,
        username: activeIdsVar().entityName,
        entityType: activeIdsVar().entityType,
        timeEntryId: timeEntry.uid,
      },
    });
    assignIdsVar({
      entityId: activeIdsVar().entityId,
      entityName: activeIdsVar().entityName,
      entityType: activeIdsVar().entityType,
      timeEntryId: timeEntry.uid,
    });
  };

  const activeColor =
    activeIdsVar().timeEntryId === timeEntry.uid
      ? { backgroundColor: "yellow" }
      : undefined;

  return (
    <TimeLineItem
      setActiveButton={setActiveButton}
      active={activeColor}
      assignEntity={assignEntity}
      timeEntry={timeEntry}
      disabled={activeIdsVar().entityId === undefined}
    />
  );
}
