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
} from "../util/clientSchema";
// @todo: Add types to the queried data objects
import {Job, User} from "../util/apolloStore";
import {TMode} from "../types/types";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
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
  const [{groups}, setGroups] = useState({groups: []});
  const [{timeEntries}, setTimeEntries] = useState({timeEntries: []});
  const [{ids}, setIds] = useState({ids: []});
  const [{startTime}, setStartTime] = useState({startTime: moment().add(-12, 'hour')});
  const [{endTime}, setEndTime] = useState({endTime: moment().add(12, 'hour')});
  const [{prevMode}, setPrevMode] = useState({prevMode: ""});
  const [{scheduleViewTimeEntry}, scheduleSetViewTimeEntry] = useState({scheduleViewTimeEntry: ""});

  function formatJobs(jobsData: any) {
    let jobs: any = [];
    // @todo: Add custom groups for more functionality.
    Object.keys(jobsData.getJobs).forEach((key, index) => {
      const job = jobsData.getJobs[index];
      jobs.push({
        id: job.uid,
        title: job.name,
      })
    });

    setGroups({groups: jobs});
  }

  function formatUsers(usersData: any) {
    let users: any = [];
    // @todo: Add custom groups for more functionality.
    Object.keys(usersData.scheduleGetUsers).forEach((key, index) => {
      const user = usersData.scheduleGetUsers[index];
      users.push({
        id: user.uid,
        title: user.username,
      })
    });

    setGroups({groups: users});
  }

  function formatTimeEntries(timeEntriesData: any) {
    let entries: any = [];

    timeEntriesData.scheduleGetTimeEntries.forEach((timeEntry: any) => {
      const title = viewMode === "job" ? timeEntry.user.username : timeEntry.job.name;
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

    setTimeEntries({timeEntries: entries});
  }

  // function createIds() {
  //   let updatedIds: any = [];
  //
  //   timeEntriesData.scheduleGetTimeEntries.forEach((timeEntry: any) => {
  //     updatedIds.push(timeEntry.uid);
  //   });
  //
  //   return updatedIds;
  // }

  let allLoading = null;
  if (viewMode === "job") {
    const {loading: jobsLoading, error: jobsError, data: jobsData}: QueryResult = useQuery(GET_JOBS, {
      onCompleted: (data) => {
        formatJobs(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on jobsData Query, Schedule.tsx", error);
      },
    });
    if (jobsLoading) {
      allLoading = jobsLoading
    }
  } else {
    const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
      onCompleted: (data) => {
        formatUsers(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on userData Query, Schedule.tsx", error);
      },
    });
    if (usersLoading) {
      allLoading = usersLoading
    }
  }
  const {loading: timeEntriesLoading, error: timeEntriesError, data: timeEntriesData, refetch}: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (data) => {
      formatTimeEntries(data);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on timeEntriesData Query, Schedule.tsx", error);
    },
  });
  if (timeEntriesLoading) {
    allLoading = timeEntriesLoading
  }

  const [newTimeEntryForJob, {loading: newTimeEntryLoading}] = useMutation(NEW_TIME_ENTRY_JOB, {
    onCompleted(data): void {
    },
    update(cache, {data}) {
      const newTimeEntryFromResponse = data.newTimeEntryForJob;
      let existingTimeEntries: any = cache.readQuery({
        query: SCHEDULE_GET_TIME_ENTRIES,
      });

      client.writeQuery({
        query: SCHEDULE_GET_TIME_ENTRIES,
        data: {
          scheduleGetTimeEntries: [
            ...existingTimeEntries.scheduleGetTimeEntries,
            newTimeEntryFromResponse
          ],
        },
      });
      updateTimeEntries();
    },
    onError: (error: ApolloError): void => {
      console.log("ERROR on newTimeEntryForJob Mutation, Schedule.tsx", error);
    },
  });
  if (newTimeEntryLoading) {
    allLoading = newTimeEntryLoading;
  }
  if (allLoading) return <CircularProgress/>;

  if (viewMode !== prevMode) {
    setPrevMode({prevMode: viewMode});

    updateTimeEntries();
  }

  async function updateTimeEntries() {
    let existingTimeEntries: any = client.readQuery({
      query: SCHEDULE_GET_TIME_ENTRIES,
    });
    const data = await refetch();
    formatTimeEntries(existingTimeEntries);
  }

  const doSubmit = async (startTime: string, endTime: string, jobId: string): Promise<void> => {
    await newTimeEntryForJob({
      variables: {
        startTime,
        endTime,
        jobId
      },
    });
  };

  // function onScrollVertical() {
  //   ...update query based on scrolling
  // }

  // Add error handling.

  return (
    <Timeline
      groups={groups}
      items={timeEntries}
      keys={keys}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={true}
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
                  "12",
                  "15",
                  "6"
                );
              }}
              >
                +
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
