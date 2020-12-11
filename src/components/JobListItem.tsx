import React from "react";
import {
  AssignIds,
  activeIdsVar,
  assignIdsVar,
  timeEntriesArrayVar,
} from "../util/apolloStore";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { SET_JOB } from "../util/clientSchema";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface Props {
  className: string;
  entityId: string;
  primaryText: string;
  buttonText: string;
  entityType: string;
}

/**
 * Composes ListItems from the data passed from JobList.
 *
 * @param:
 *   props:
 *     className: A string containing a custom class.
 *     entityId: A string containing the jobs uid.
 *     primaryText: A string containing the job's name to display in the
 *       ListItem. The ListItem also serves as a button to set the ListItem's
 *       entityId to active when clicked.
 *     buttonText: A string containing the label for the "Assign" button.
 *     entityType: A string containing the entity's type.
 *   activeIdsVar: A Reactive variable used to set or retrieve the active entity
 *     information.
 *   assignIdsVar: A Reactive variable used to set or retrieve the assignable
 *     entity information.
 *   jobsArrayVar: A Reactive variable used to set or retrieve the list of
 *     current jobs.
 *   timeEntriesArrayVar: A Reactive variable used to set or retrieve the list
 *     of current timeEntries.
 *
 * @return ReactElement.
 */
export function JobListItem(props: Props): React.ReactElement {
  const { className, entityId, primaryText, buttonText, entityType } = props;
  const activeIds = useReactiveVar(activeIdsVar);

  /**
   * Graphql Mutation
   */
  const [setJob, { loading }] = useMutation(SET_JOB, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.setJob);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on setJob Mutation, JobListItem.tsx", error);
    },
  });
  if (loading) return <CircularProgress />;

  /**
   * Mutation function call.
   */
  const assignJob = async ({
    entityId,
    entityName,
    entityType,
    timeEntryId,
  }: AssignIds): Promise<void> => {
    await setJob({
      variables: {
        jobId: entityId,
        jobName: entityName,
        entityType,
        timeEntryId,
      },
    });
    await assignIdsVar({
      entityId,
      entityName,
      entityType,
      timeEntryId,
    });
  };

  const activeColor =
    activeIds.entityId === entityId ? { backgroundColor: "yellow" } : undefined;

  return (
    <div className="entity-list-item" style={activeColor}>
      <ListItem
        className={`${className} set-active`}
        alignItems="flex-start"
        button={true}
        onClick={() => {
          activeIdsVar({
            entityId,
            entityName: primaryText,
            entityType: entityType,
            timeEntryId: activeIds.timeEntryId,
          });
        }}
      >
        <ListItemText primary={primaryText} />
      </ListItem>
      <Button
        className="assign"
        onClick={async () => {
          await assignJob({
            entityId,
            entityName: primaryText,
            entityType,
            timeEntryId: activeIds.timeEntryId,
          });
        }}
        disabled={activeIds.timeEntryId === undefined}
      >
        {buttonText}
      </Button>
    </div>
  );
}
