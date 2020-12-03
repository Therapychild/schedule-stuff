import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {
  AssignIds,
  activeIdsVar,
  assignIdsVar,
  timeEntriesArrayVar
} from "../util/apolloStore";
import {ApolloError, useMutation, useReactiveVar} from "@apollo/client";
import {SET_JOB} from "../util/clientSchema";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface Props {
  className: string;
  entityId: string;
  primaryText: string;
  buttonText: string;
  entityType: string;
}

export function JobListItem(props: Props): React.ReactElement {
  const {
    className,
    entityId,
    primaryText,
    buttonText,
    entityType,
  } = props;
  const activeIds = useReactiveVar(activeIdsVar);

  const [setJob, {loading: setJobLoading}] = useMutation(SET_JOB, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.setJob);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on setJob Mutation, JobListItem.tsx", error);
    },
  });
  if (setJobLoading) return <CircularProgress/>;

  const assignJob = async ({entityId, entityName, entityType, timeEntryId}: AssignIds): Promise<void> => {
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
      timeEntryId
    });
  }

  const activeColor = activeIds.entityId === entityId ? {backgroundColor: "yellow"} : undefined;

  console.log("Rendering AssignableListItem.tsx");
  return (
    <div className="entity-list-item" style={activeColor}>
      <ListItem
        className={`${className}-list-item`}
        alignItems="flex-start"
        button={true}
        onClick={() => {
          activeIdsVar({
            entityId,
            entityName: primaryText,
            entityType: entityType,
            timeEntryId: activeIds.timeEntryId
          });
          console.log("SetActive, ListItem", activeIdsVar());
        }}
      >
        <ListItemText primary={primaryText}/>
      </ListItem>
      <Button
        className="assign"
        onClick={async () => {
          await assignJob({
            entityId,
            entityName: primaryText,
            entityType,
            timeEntryId: activeIds.timeEntryId
          });
          console.log("Assignable ListItem", assignIdsVar());
        }}
        disabled={activeIds.timeEntryId === undefined}
      >
        {buttonText}
      </Button>
    </div>
  );
}
