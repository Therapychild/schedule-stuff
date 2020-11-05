import React from "react";
import {
  ApolloError,
  DocumentNode,
  QueryResult,
  useQuery,
  makeVar
} from "@apollo/client";
// import {GET_SCHEDULE_DATA} from "../util/schema";
import {TMode} from "../types/mode";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import CircularProgress from "@material-ui/core";

// Keys needed for Timeline.
const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

export interface Props {
}

// Data Shape Returned from query.
interface ScheduleData {
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
  // const { loading, error, data }: QueryResult = useQuery(GET_SCHEDULE_DATA, {
  //   onCompleted: (data) => {
  //     // Set data to global state/
  //   },
  //   // Look in to getting these to display.
  //   onError: (error: ApolloError) => {
  //     console.log("ERROR on Autocomplete", error);
  //   },
  // });
  // if (loading) return <CircularProgress>;

  // function formatGroups(data) {
  //   data.groups...
  // }

  // function formatTimeEntries(data) {
  //   data.timeEntries...
  // }

  // function initialize(data: ScheduleData) {
  //   formatGroups(data);
  //   Set groups to global state
  //   formatTimeEntries(data);
  //   Set timeEntries to global state
  //   Set altGroups to global state, Formatting takes place on BaseListBox
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
