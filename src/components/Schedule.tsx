import React from "react";
import {
  ApolloError,
  DocumentNode,
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
}

// Data Shape Returned from query.
interface usersData {
}

export function Schedule(props: Props) {
  // Add ApolloClient here in order to access state.

  // Find out default value of start time, for now set it to Monday of current week.
  const defaultTimeStart = makeVar(moment().add(-12, 'hour'));
  // Find out default value of end time, for now set it for Sunday of following week.
  const defaultTimeEnd = makeVar(moment(12, 'hour'));
  // const groups = makeVar(data.groups);
  // const items = makeVar(data.timeEntryItems);
  // const altGroups = makeVar(data.altGroups);

  // Run query to get initial data, based on viewMode (default is "jobs").
  // Data from queries will have to be kept in global state so each component
  // that needs it has access to it.
  const { loading: jobsLoading, error: jobsError, data: jobsData }: QueryResult = useQuery(GET_JOBS, {
    onCompleted: (data) => {
      // Save data to cache.
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on jobsData", error);
    },
  });

  const { loading: usersLoading, error: usersError, data }: QueryResult = useQuery(SCHEDULE_GET_USERS, {
    onCompleted: (data) => {
      // Save data to cache.
      formatGroups(data)
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on userData", error);
    },
  });

  const { loading: entriesLoading, error: entriesError, data: entriesData }: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (data) => {
      // Save data to cache.
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on entriesData", error);
    },
  });

  if (jobsLoading || usersLoading || entriesLoading) return <CircularProgress />;

  function formatGroups(data: usersData) {
  }

  // function formatTimeEntries(data) {
  //   data.timeEntries...
  // }

  // function initialize(data: ScheduleData) {
  //   formatGroups(data);
  //   formatTimeEntries(data);
  // }

  // function onScrollVertical() {
  //   ...update query based on scrolling
  // }

  return (
    <Timeline
      groups={[]}
      items={[]}
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
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
}
