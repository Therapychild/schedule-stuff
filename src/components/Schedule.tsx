import React, {useState} from "react";
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
import {
  ApolloError,
  useMutation,
  useReactiveVar
} from "@apollo/client";
import {
  MOVE_TIME_ENTRY,
  NEW_TIME_ENTRY_JOB,
  NEW_TIME_ENTRY_USER
} from "../util/clientSchema";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineGroupBase,
  TimelineItemBase,
} from "react-calendar-timeline";
import {TimeLineItem} from "./TimeLineItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";

import "react-calendar-timeline/lib/Timeline.css";
import "../styles/timeline.scss"

// Keys needed for Timeline.
const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',    // key for item div content
  itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
};

export function Schedule() {
  const [{startTime}, setStartTime] = useState({startTime: moment().add(-12, 'hour')});
  const [{endTime}, setEndTime] = useState({endTime: moment().add(12, 'hour')});
  const groupsData = viewModeVar() === "job" ? jobsArrayVar() : usersArrayVar();
  const timeEntriesArray: TimeEntry[] = useReactiveVar(timeEntriesArrayVar);
  useReactiveVar(assignIdsVar);

  let groups: TimelineGroupBase[] = [];
  function formatGroups(groupsData: any[]) {
    let groupItems: TimelineGroupBase[] = [];
    if (viewModeVar() === "job") {
      // @todo: Add custom groups for more functionality.
      groupsData.forEach((job: Job) => {
        groupItems.push({
          id: job.uid,
          title: job.name,
        })
      });
    } else if (viewModeVar() === "user") {
      // @todo: Add custom groups for more functionality.
      groupsData.forEach((user: User) => {
        groupItems.push({
          id: user.uid,
          title: user.username,
        })
      });
    }

    groups = groupItems;
  }

  let items: TimelineItemBase<any>[] = [];

  function formatTimeEntries(timeEntriesData: TimeEntry[]) {
    let entries: TimelineItemBase<any>[] = [];
    timeEntriesData.forEach((timeEntry) => {
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

  // Server Mutations.
  let anyLoading = null;
  const [newTimeEntryForJob, {loading: newJobTimeEntryLoading}] = useMutation(NEW_TIME_ENTRY_JOB, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.newTimeEntryForJob);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on newTimeEntryForJob Mutation, Schedule.tsx", error);
    },
  });
  if (newJobTimeEntryLoading) {
    anyLoading = newJobTimeEntryLoading;
  }

  const [newTimeEntryForUser, {loading: newUserTimeEntryLoading}] = useMutation(NEW_TIME_ENTRY_USER, {
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

  const [moveTimeEntry, {loading: moveTimeEntryLoading}] = useMutation(MOVE_TIME_ENTRY, {
    onCompleted(data): void {
      timeEntriesArrayVar(data.moveTimeEntry);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on moveTimeEntry Mutation, Schedule.tsx", error);
    },
  });
  if (moveTimeEntryLoading) {
    anyLoading = moveTimeEntryLoading;
  }

  if (anyLoading) return <CircularProgress/>;

  const createNewTimeEntry = async (type: string, startTime: string, endTime: string, jobId?: string | null, userId?: string | null): Promise<void> => {
    if (type === "job") {
      await newTimeEntryForJob({
        variables: {
          startTime,
          endTime,
          jobId
        },
      });
    } else if (type === "user") {
      await newTimeEntryForUser({
        variables: {
          startTime,
          endTime,
          userId
        },
      });
    }
  };

  async function handleItemMove(timeEntryId: string, dragTime: number, newGroupOrder: number) {
    // Get group number for reassignment.
    const newGroup: TimelineGroupBase = groups[newGroupOrder];

    // Get time timeEntry from state, based on the timeEntryId.
    let movedTimeEntry: TimeEntry | undefined = undefined;
    if (timeEntriesArray) {
      for (let timeEntry of timeEntriesArray) {
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
    const endTime = (dragTime + (+movedTimeEntry.endTime - +movedTimeEntry.startTime)).toString();
    const newGroupId = newGroup.id;

    await moveTimeEntry({
      variables: {
        startTime,
        endTime,
        timeEntryId,
        newGroupId,
      },
    });
  }

  formatGroups(groupsData);
  formatTimeEntries(timeEntriesArray);

  console.log("Rendering Schedule.tsx");
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
          {({getRootProps}) => {
            return <div {...getRootProps()}>
              <Button onClick={() => {
                createNewTimeEntry(
                  "job",
                  "12",
                  "15",
                  "6",
                  null
                );
              }}
              >
                +JobTE
              </Button>
              <Button onClick={() => {
                createNewTimeEntry(
                  "user",
                  "12",
                  "15",
                  null,
                  "3"
                );
              }}
              >
                +UserTE
              </Button>
            </div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader"/>
        <DateHeader/>
      </TimelineHeaders>
    </Timeline>
  );
}
