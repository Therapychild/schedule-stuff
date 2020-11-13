import React, {useState} from "react";
import {
  ApolloError,
  QueryResult,
  useQuery,
  makeVar
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
  // @todo:Add ApolloClient here in order to access the cache.

  // @todo: Find out default value of start/end time.
  const defaultTimeStart = makeVar(moment().add(-12, 'hour'));
  const defaultTimeEnd = makeVar(moment(12, 'hour'));
  const [groups, setGroups] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  // const items = makeVar(data.timeEntryItems);
  // const altGroups = makeVar(data.altGroups);

  function formatUsers(usersData: any) {
    let users: any = [];
    // @todo: Add custom groups for more functionality.
    Object.keys(usersData.scheduleGetUsers).forEach((key, index) => {
      const user = usersData.scheduleGetUsers[index];
      users.push({
        id: user.uid,
        title: user.userName,
      })
    });

    setGroups(users);
  }

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

  // Run query to get initial data, based on viewMode (default is "job").
  // @todo: Data will have to be saved to local state, as well as cache.

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
  } else if (viewMode === "user") {
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

  const {loading: timeEntriesLoading, error: timeEntriesError, data: timeEntriesData}: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (data) => {
      formatTimeEntries(data);
      console.log("query", data);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on timeEntriesData", error);
    },
  });
  if (loading || timeEntriesLoading) return <CircularProgress/>;

  function formatTimeEntries(timeEntriesData: any) {
    let entries: any = [];
    // @todo: Add custom items for more functionality.
    if (viewMode === "user") {
      Object.keys(timeEntriesData.scheduleGetTimeEntries).forEach((key, index) => {
        const timeEntry = timeEntriesData.scheduleGetTimeEntries[index];
        const timeEntryGroup = timeEntry[viewMode];
        // prettier-ignore (The _ triggers prettier, but is a component prop).
        entries.push({
          id: timeEntry.uid,
          group: timeEntryGroup.uid,
          // @todo: Add the TimeLineItem to title when completed.
          title: timeEntry.job.name,
          start_time: timeEntry.startTime,
          end_time: timeEntry.endTime,
          canMove: true,
          canResize: true,
          canChangeGroup: true,
        });
      });

      setTimeEntries(entries);
    } else if (viewMode === "job") {
      Object.keys(timeEntriesData.scheduleGetTimeEntries).forEach((key, index) => {
        const timeEntry = timeEntriesData.scheduleGetTimeEntries[index];
        const timeEntryGroup = timeEntry[viewMode];
        // prettier-ignore
        entries.push({
          id: timeEntry.uid,
          group: timeEntryGroup.uid,
          // @todo: Add the TimeLineItem to title when completed.
          title: timeEntry.user.userName,
          start_time: timeEntry.startTime,
          end_time: timeEntry.endTime,
          canMove: true,
          canResize: true,
          canChangeGroup: true,
        });
      });

      setTimeEntries(entries);
    }
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
      defaultTimeStart={defaultTimeStart()}
      defaultTimeEnd={defaultTimeEnd()}
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
