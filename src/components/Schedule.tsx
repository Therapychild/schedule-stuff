import React, { useState } from "react";
import {
  Job,
  User,
  TimeEntry,
  viewModeVar,
  jobsArrayVar,
  usersArrayVar,
  timeEntriesArrayVar,
  assignIdsVar,
} from "../util/apolloStore";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import {
  MOVE_TIME_ENTRY,
  NEW_TIME_ENTRY_JOB,
  NEW_TIME_ENTRY_USER,
} from "../util/clientSchema";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineGroupBase,
  TimelineItemBase,
} from "react-calendar-timeline";
import { TimeLineItem } from "./TimeLineItem";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import "react-calendar-timeline/lib/Timeline.css";
import "../styles/timeline.scss";

// Keys required by Timeline.
const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title", // key for item div content
  itemDivTitleKey: "title", // key for item div title (<div title="text"/>)
  itemGroupKey: "group",
  itemTimeStartKey: "start_time",
  itemTimeEndKey: "end_time",
};

/**
 * Composes the Timeline and its child components, and handles graphql data
 * mutations to update the viewable data.
 *
 * @param:
 *   viewModeVar: A Reactive variable used to set or retrieve the viewMode state.
 *   jobsArrayVar: A Reactive variable used to set or retrieve a list of jobs.
 *   usersArrayVar: A Reactive variable used to set or retrieve a list of users.
 *   timeEntriesArrayVar: A Reactive variable used to set or retrieve a list of
 *     timeEntries.
 *   assignIdsVar: A Reactive variable used to set or retrieve the assignable
 *     entity information.
 *   startTime: A timestamp representing where the visible Timeline begins.
 *   endTime: A timestamp representing where the visible TimeLine ends.
 *
 * @returns ReactElement.
 */

export function Schedule(): React.ReactElement {
  const [{ startTime }, setStartTime] = useState({
    startTime: moment().add(-12, "hour"),
  });
  const [{ endTime }, setEndTime] = useState({
    endTime: moment().add(12, "hour"),
  });
  const timeEntriesArray: TimeEntry[] = useReactiveVar(timeEntriesArrayVar);
  useReactiveVar(assignIdsVar);

  /**
   * Format Data from queries/mutations.
   */
  let groups: TimelineGroupBase[] = [];
  function formatJobs(jobs: Job[]) {
    const jobItems: TimelineGroupBase[] = [];
    jobs.forEach((job: Job) => {
      jobItems.push({
        id: job.uid,
        title: job.name,
      });
    });

    groups = jobItems;
  }

  function formatUsers(users: User[]) {
    const userItems: TimelineGroupBase[] = [];
    users.forEach((user: User) => {
      userItems.push({
        id: user.uid,
        title: user.username,
      });
    });

    groups = userItems;
  }

  let items: TimelineItemBase<any>[] = [];
  function formatTimeEntries(timeEntries: TimeEntry[]) {
    const entries: TimelineItemBase<any>[] = [];
    timeEntries.forEach((timeEntry) => {
      // prettier-ignore
      entries.push({
        id: timeEntry.uid,
        group: timeEntry[viewModeVar()].uid,
        title: <TimeLineItem
          timeEntry={timeEntry}
        />,
        start_time: timeEntry.startTime,
        end_time: timeEntry.endTime,
        canMove: true,
        canResize: true,
        canChangeGroup: true,
      });
    });

    items = entries;
  }

  /**
   * Graphql Mutations.
   */
  let anyLoading = null;
  const [newTimeEntryForJob, { loading: newJobTimeEntryLoading }] = useMutation(
    NEW_TIME_ENTRY_JOB,
    {
      onCompleted(data): void {
        timeEntriesArrayVar(data.newTimeEntryForJob);
      },
      onError: (error: ApolloError): void => {
        console.log(
          "ERROR on newTimeEntryForJob Mutation, Schedule.tsx",
          error
        );
      },
    }
  );
  if (newJobTimeEntryLoading) {
    anyLoading = newJobTimeEntryLoading;
  }

  const [
    newTimeEntryForUser,
    { loading: newUserTimeEntryLoading },
  ] = useMutation(NEW_TIME_ENTRY_USER, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.newTimeEntryForUser);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on newTimeEntryForUser Mutation, Schedule.tsx", error);
    },
  });
  if (newUserTimeEntryLoading) {
    anyLoading = newUserTimeEntryLoading;
  }

  const [moveTimeEntry, { loading: moveTimeEntryLoading }] = useMutation(
    MOVE_TIME_ENTRY,
    {
      onCompleted(data): void {
        timeEntriesArrayVar(data.moveTimeEntry);
      },
      onError: (error: ApolloError): void => {
        console.log("ERROR on moveTimeEntry Mutation, Schedule.tsx", error);
      },
    }
  );
  if (moveTimeEntryLoading) {
    anyLoading = moveTimeEntryLoading;
  }
  if (anyLoading) return <CircularProgress />;

  /**
   * Mutation function calls.
   */
  const createNewTimeEntry = async (
    type: string,
    startTime: string,
    endTime: string,
    jobId?: string | null,
    userId?: string | null
  ): Promise<void> => {
    if (type === "job") {
      await newTimeEntryForJob({
        variables: {
          startTime,
          endTime,
          jobId,
        },
      });
    } else if (type === "user") {
      await newTimeEntryForUser({
        variables: {
          startTime,
          endTime,
          userId,
        },
      });
    }
  };

  const handleItemMove = async (
    timeEntryId: string,
    dragTime: number,
    newGroupOrder: number
  ): Promise<void> => {
    // Get new group position for reassignment.
    const newGroup: TimelineGroupBase = groups[newGroupOrder];

    let movedTimeEntry: TimeEntry | undefined = undefined;
    if (timeEntriesArray) {
      for (const timeEntry of timeEntriesArray) {
        if (timeEntryId === timeEntry.uid) {
          movedTimeEntry = timeEntry;
          break;
        }
      }
    }
    if (!movedTimeEntry) {
      return;
    }

    const startTime = dragTime.toString();
    const endTime = (
      dragTime +
      (+movedTimeEntry.endTime - +movedTimeEntry.startTime)
    ).toString();
    const newGroupId = newGroup.id;

    await moveTimeEntry({
      variables: {
        startTime,
        endTime,
        timeEntryId,
        newGroupId,
      },
    });
  };

  viewModeVar() === "job"
    ? formatJobs(jobsArrayVar())
    : formatUsers(usersArrayVar());
  formatTimeEntries(timeEntriesArray);

  return (
    <Timeline
      groups={groups}
      items={items}
      keys={keys}
      itemHeightRatio={0.75}
      minZoom={60 * 60 * 1000 * 24}
      canMove={true}
      canResize={"both"}
      useResizeHandle={true}
      stackItems={true}
      itemTouchSendsClick={false}
      onItemMove={handleItemMove}
      defaultTimeStart={startTime}
      defaultTimeEnd={endTime}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div {...getRootProps()}>
                <Button
                  onClick={async () => {
                    // @todo: move to cell when ready
                    await createNewTimeEntry("job", "12", "15", "6", null);
                  }}
                >
                  +JobTE
                </Button>
                <Button
                  onClick={async () => {
                    await createNewTimeEntry("user", "12", "15", null, "3");
                  }}
                >
                  +UserTE
                </Button>
              </div>
            );
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
}
