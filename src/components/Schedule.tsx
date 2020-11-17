import React, {useState} from "react";
import {
  ApolloError,
  QueryResult,
  useQuery,
} from "@apollo/client";
import {
  GET_JOBS,
  SCHEDULE_GET_USERS,
  SCHEDULE_GET_TIME_ENTRIES
} from "../util/clientSchema";
import {TMode} from "../types/mode";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import CircularProgress from "@material-ui/core/CircularProgress";

import 'react-calendar-timeline/lib/Timeline.css';
// @todo: Add types to the queried data objects
import {Job, User} from "../util/apolloStore";
import {Button} from "@material-ui/core";

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
  const {viewMode} = props;
  // @todo: Find out default value of start/end time.
  const [groups, setGroups] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [{startTime}, setStartTime] = useState({startTime: moment().add(-12, 'hour')});
  const [{endTime}, setEndTime] = useState({endTime: moment().add(12, 'hour')});
  const [ids, setIds] = useState([]);
  const [prevMode, setPrevMode] = useState("");

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

    setGroups(jobs);
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

    setGroups(users);
  }

  function formatTimeEntries(timeEntriesData: any) {
    console.log(timeEntriesData);
    let entries: any = [];

    timeEntriesData.scheduleGetTimeEntries.forEach((timeEntry: any, index: number) => {
      const title = viewMode === "job" ? timeEntry.user.username : timeEntry.job.name;
      // prettier-ignore
      entries.push({
        id: timeEntry.uid,
        group: timeEntry[viewMode].uid,
        // @todo: Add the TimeLineItem to title when completed.
        title: title,
        start_time: timeEntry.startTime,
        end_time: timeEntry.endTime,
        canMove: true,
        canResize: true,
        canChangeGroup: true,
      });
    });

    setTimeEntries(entries);
  }

  function createIds() {
    let updatedIds: any = [];

    timeEntriesData.scheduleGetTimeEntries.forEach((timeEntry: any, index: number) => {
      updatedIds.push(timeEntry.uid);
    });

    return updatedIds;
  }

  let loading = null;
  if (viewMode === "job") {
    const {loading: jobsLoading, error: jobsError, data: jobsData}: QueryResult = useQuery(GET_JOBS, {
      onCompleted: (data) => {
        formatJobs(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on jobsData", error);
      },
    });
    if (jobsLoading) {
      loading = jobsLoading
    }
  } else {
    const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
      onCompleted: (data) => {
        formatUsers(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on userData", error);
      },
    });
    if (usersLoading) {
      loading = usersLoading
    }
  }

  const {loading: timeEntriesLoading, error: timeEntriesError, data: timeEntriesData, refetch}: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (data) => {
      formatTimeEntries(data);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on timeEntriesData", error);
    },
  });
  if (timeEntriesLoading) {
    loading = timeEntriesLoading
  }
  if (loading) return <CircularProgress/>;

  if (viewMode !== prevMode) {
    setPrevMode(viewMode);
    updateTimeEntries();
  }

  async function updateTimeEntries() {
    const data = await refetch();
    formatTimeEntries(data.data);
  }

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
            return <div {...getRootProps()}>Left</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader"/>
        <DateHeader/>
      </TimelineHeaders>
    </Timeline>
  );
}
