import React from "react";
import {TMode} from "../types/mode";
import QueryInterface from "duckies/dist/interfaces/QueryInterface";
import moment, {Moment} from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";

import "react-calendar-timeline/lib/Timeline.css";

// @todo Remove
import {
  getTimeEntries,
  getJobResources,
  getUserResources
} from "../js/resources";
import {TimeLineItemCard} from "./TimeLineItemCard";
// @todo Remove

var keys = {
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

// Disabled for demo
export interface StateProps {
  // groupResources: []; // Will be either a Jobs or Users array
  // itemResources: []; // Will be a TimeEntries array
  viewMode: TMode;
  // visibleTimeStart: Moment;
  // visibleTimeEnd: Moment;
}

// Disabled for demo
export interface DispatchProps {
  // defaultQuery: (query: QueryInterface) => void;
}

type Props = StateProps;

export class Schedule extends React.Component<Props, {}> {

  // These need to be worked out when GraphQL queries are completed.
  defaultGroupQuery?: QueryInterface;
  defaultTimeEntryQuery?: QueryInterface;

  componentDidMount() {
    // const {defaultQuery} = this.props;
    // Run the groupQuery
    // Provides a groups(jobs/users) resource[]
    // Provides a timeEntries resource[] based on dates and groups.
    // Provides timeStartDate and timeEndDate for TimeLine

    // defaultQuery(this.defaultGroupQuery);
  }

  onTimelineDateChange() {
    // Updates the groupQuery with new date range
    // Returns "timeStart" and "timeEnd"
    // Affected by manual date change, and CTRL zoom
  }

  onScrollVertical() {
    // Updates groupQuery, lazy loads N number of groups and releases group
    // claims outside of range.
  }

  render() {
    // const { viewMode, groupResources, itemResources, visibleTimeStart, visibleTimeEnd } = this.props;
    const {viewMode } = this.props;

    /** Convert the groups object (jobs/users) to an array with the correct
     * mapped. Will be turned into groupResources in mapStateToProps.
     */

      // @Todo remove
    const jobs: any = getJobResources();
    let jobResources: any[] = [];
    Object.keys(jobs).forEach((key: string) => {
      const job: any = jobs[key]
      jobResources.push({
        id: job.get("id"),
        title: job.get("name.name")
      });
    })

    let users: any = getUserResources();
    let userResources: any[] = [];
    Object.keys(users).forEach((index: string) => {
      const user = users[index];
      const userGroup = user.viewMode;

      // if (!userGroup) {
      //   return
      // }
      userResources.push({
        id: user.get("id"),
        group: users[index].id,
        title: user.get("displayName")
      });
    })

    const groups = viewMode === "job" ? jobResources : userResources;

    // Provide a range of dates to view with defaultTimeStart and defaultTimeEnd.
    // This will be updated via a query through use of filters.
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    /**
     * The Timeline component requires an array for its items prop.
     * Data received from the query comes in th form of an object.
     */
    let itemResources: any[] = [];

    // Get list of timeEntries. (This will be replaced by a query)
    let timeEntries: any = getTimeEntries(
      Math.floor(defaultTimeStart.getTime()/1000),
      Math.floor(defaultTimeEnd.getTime()/1000)
    );
    timeEntries = Object.keys(timeEntries).forEach((key: string) => {
      const timeEntry = timeEntries[key];
      const timeEntryGroup = timeEntry.get(viewMode);

      if (!timeEntryGroup) {
        return
      }
      itemResources.push({
        id: timeEntry.get("id"),
        group: timeEntryGroup.id,
        title: <TimeLineItemCard data={timeEntry}/>,
        start: timeEntry.get("start") * 1000,
        end: (timeEntry.get("end")+ 900) * 1000,
        itemProps: {
        }
      })
    });
    // @todo Remove

    console.log(itemResources);
    return (
      <Timeline
        groups={groups}
        items={itemResources}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={true}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
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
}
