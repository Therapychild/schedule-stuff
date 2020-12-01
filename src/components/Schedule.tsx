import React, {useState} from "react";
import {
  ApolloError,
  QueryResult,
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import {
  GET_JOBS,
  SCHEDULE_GET_USERS,
  SCHEDULE_GET_TIME_ENTRIES,
  NEW_TIME_ENTRY_JOB,
  NEW_TIME_ENTRY_USER,
  MOVE_TIME_ENTRY,
} from "../util/clientSchema";
import {
  Job,
  User,
  TimeEntry,
  TimeEntryItem,
  timeEntryItemsVar
} from "../util/apolloStore";
import {TMode} from "../util/types";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineGroupBase
} from "react-calendar-timeline";
import {TimeLineItem} from "./TimeLineItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";

import 'react-calendar-timeline/lib/Timeline.css';

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

export interface Props {
  viewMode: TMode;
  setViewMode: Function;
}

export function Schedule(props: Props) {
  const client = useApolloClient();
  const {viewMode} = props;
  // @todo: Find out default value of start/end time.
  const [{groups}, setGroups] = useState<{ groups: any[] }>({groups: []});
  const [{startTime}, setStartTime] = useState({startTime: moment().add(-12, 'hour')});
  const [{endTime}, setEndTime] = useState({endTime: moment().add(12, 'hour')});
  const [{prevMode}, setPrevMode] = useState({prevMode: ""});
  const [{scheduleViewTimeEntry}, scheduleSetViewTimeEntry] = useState({scheduleViewTimeEntry: ""});

  function formatJobs(jobsData: Job[]) {
    let jobs: TimelineGroupBase[] = [];
    // @todo: Add custom groups for more functionality.
    jobsData.forEach((job: Job) => {
      jobs.push({
        id: job.uid,
        title: job.name,
      })
    });

    setGroups({groups: jobs});
  }

  function formatUsers(usersData: User[]) {
    let users: TimelineGroupBase[] = [];
    // @todo: Add custom groups for more functionality.
    usersData.forEach((user: User) => {
      users.push({
        id: user.uid,
        title: user.username,
      })
    });

    setGroups({groups: users});
  }

  function formatTimeEntries(timeEntriesData: TimeEntry[]) {
    let entries: TimeEntryItem[] = [];

    timeEntriesData.forEach((timeEntry) => {
      // prettier-ignore
      entries.push({
        id: timeEntry.uid,
        group: timeEntry[viewMode].uid,
        title: <TimeLineItem
          timeEntry={timeEntry}
          viewMode={viewMode}
          scheduleSetViewTimeEntry={scheduleSetViewTimeEntry}
        />,
        start_time: timeEntry.startTime,
        end_time: timeEntry.endTime,
        canMove: true,
        canResize: true,
        canChangeGroup: true,
      });
    });

    timeEntryItemsVar(entries);
    updateTimeEntryItems(entries);
  }

  // Server Queries
  let anyLoading = null;
  if (viewMode === "job") {
    const {loading: jobsLoading, error: jobsError, data: jobsData}: QueryResult = useQuery(GET_JOBS, {
      onCompleted: (jobsData) => {
        formatJobs(jobsData.getJobs);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on jobsData Query, Schedule.tsx", error);
      },
    });
    if (jobsLoading) {
      anyLoading = jobsLoading
    }
  } else {
    const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
      onCompleted: (usersData) => {
        formatUsers(usersData.scheduleGetUsers);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on userData Query, Schedule.tsx", error);
      },
    });
    if (usersLoading) {
      anyLoading = usersLoading
    }
  }

  const {loading: timeEntriesLoading, error: timeEntriesError, data: timeEntriesData, refetch}: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (timeEntriesData) => {
      formatTimeEntries(timeEntriesData.scheduleGetTimeEntries);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on timeEntriesData Query, Schedule.tsx", error);
    },
  });
  if (timeEntriesLoading) {
    anyLoading = timeEntriesLoading
  }

  // Server Mutations
  const [newTimeEntryForJob, {loading: newJobTimeEntryLoading}] = useMutation(NEW_TIME_ENTRY_JOB, {
    onCompleted(data): void {
      formatTimeEntries(data.newTimeEntryForJob);
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
      formatTimeEntries(data.newTimeEntryForUser);
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
      formatTimeEntries(data.moveTimeEntry);
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on moveTimeEntry Mutation, Schedule.tsx", error);
    },
  });
  if (moveTimeEntryLoading) {
    anyLoading = moveTimeEntryLoading;
  }
  if (anyLoading) return <CircularProgress/>;

  // @todo: Add resizing mutation.

  if (viewMode !== prevMode) {
    setPrevMode({prevMode: viewMode});
    updateTimeEntries();
  }

  async function updateTimeEntries() {
    let existingTimeEntries: any = client.readQuery({
      query: SCHEDULE_GET_TIME_ENTRIES,
    });
    const data = await refetch();
    formatTimeEntries(existingTimeEntries.scheduleGetTimeEntries);
  }
  async function updateTimeEntryItems(data: TimeEntryItem[]) {
    await refetch();
  }


  const doSubmit = async (type: string, startTime: string, endTime: string, jobId?: string | null, userId?: string | null): Promise<void> => {
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
    // Get groups from state in order to get the group id in case the item
    // changes groups, not just start/end times.
    const newGroup: any = groups[newGroupOrder];

    // Get time timeEntry from state, based on the timeEntryId.
    let movedTimeEntryItem: TimeEntryItem | undefined = undefined;
    for (let timeEntryItem of timeEntryItemsVar()) {
      if (timeEntryId === timeEntryItem.id) {
        movedTimeEntryItem = timeEntryItem;
        break;
      }
    }
    if (!movedTimeEntryItem) {
      return;
    }

    const startTime = dragTime.toString();
    const endTime = (dragTime + (+movedTimeEntryItem.end_time - +movedTimeEntryItem.start_time)).toString();
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

  // function onScrollVertical() {
  //   ...update query based on scrolling
  // }

  // Add error handling.

  return (
    <Timeline
      groups={groups}
      items={timeEntryItemsVar()}
      keys={keys}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={true}
      onItemMove={handleItemMove}
      canResize={true}
      defaultTimeStart={startTime}
      defaultTimeEnd={endTime}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({getRootProps}) => {
            return <div {...getRootProps()}>
              <Button onClick={() => {
                doSubmit(
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
                doSubmit(
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
