import React from "react";
import {TMode} from "../types/mode";
// import QueryInterface from "duckies/dist/interfaces/QueryInterface";
import moment, {Moment} from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import {ConnectedTimeLineItem} from "./connected/TimeLineItem";


import "react-calendar-timeline/lib/Timeline.css";
// import {ConnectedTimeLineItem} from "./connected/TimeLineItem";
// import Channelizer from "duckies/dist/utility/channelizer";
import Resource from "duckies/dist/resource/Resource";

// @todo Remove
import {
  getTimeEntries,
  getJobResources,
  getUserResources
} from "../js/resources";
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

export interface OwnProps {
  // defaultGroupQuery: QueryInterface;
  // defaultTimeEntryQuery: QueryInterface;
}

// Disabled for demo
export interface StateProps {
  // resources: Resource[]; // Jobs or Users array
  // timeEntries: Resource[]; // TimeEntries array
  viewMode: TMode;
  // defaultTimeStart: Moment;
  // defaultTimeEnd: Moment;
}

// Disabled for demo
export interface DispatchProps {
  // defaultQuery: (query: QueryInterface, channelizer: Channelizer) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

export class Schedule extends React.Component<Props, {}> {

  /**
   * Runs the defaultGroupQuery.
   * Provides defaultTimeStart and defaultTimeEnd for the TimeLine.
   * Provides a groups[], based on Start/End Dates. for the
   * defaultTimeEntryQuery.
   */
  componentDidMount() {
    // const {defaultQuery, defaultGroupQuery, channelizer} = this.props;
    //
    // defaultQuery(defaultGroupQuery, channelizer);
  }

  /**
   * Updates the defaultGroupQuery with new date range.
   * Updates the defaultTimeEntryQuery based on new defaultGroupQuery.
   * Affected by manual date change, button + MouseWheel zoom, and pinch-zoom.
   * Ctrl/Shift/Alt have different zoom levels.
   */
  onTimelineDateChange() {
  }

  /**
   * Updates defaultGroupQuery with new a groups[] based on max number of
   * viewable groups.
   * Updates the defaultTimeEntryQuery based on new defaultGroupQuery.
   * Lazy loads N number of groups.
   * Releases group claims outside of range. (performance optimization,
   * low priority)
   */
  onScrollVertical() {
  }

  render() {
    // const { viewMode, groupResources, itemResources, visibleTimeStart, visibleTimeEnd } = this.props;
    const {viewMode } = this.props;

    /** Convert the groups object (jobs/users) to an array with the correct
     * mapped. Will be turned into groupResources in mapStateToProps.
     */

      // @Todo remove
    const jobs: any = getJobResources();
    let jobGroups: any[] = [];
    Object.keys(jobs).forEach((key: string, index:number) => {
      let job: any = jobs[key];
      jobGroups.push({
        id: job.get("id"),
        title: job.get("name.name"),
        data: job
      });
    })

    let users: any = getUserResources();
    let userGroups: any[] = [];
    Object.keys(users).forEach((key: string, index:number) => {
      const user = users[key];
      userGroups.push({
        id: user.get("id"),
        title: user.get("name"),
        data: user,
        group: users[key].id
      });
      // console.log(index);
      // console.log(key);
      // console.log(user);
    })


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
    let items: any[] = [];

    // Get list of timeEntries. (This will be replaced by a query)
    let timeEntries: any = getTimeEntries(
      Math.floor(defaultTimeStart.getTime()/1000),
      Math.floor(defaultTimeEnd.getTime()/1000)
    );
    timeEntries = Object.keys(timeEntries).forEach((key: string) => {
      const timeEntry: Resource = timeEntries[key];
      const timeEntryGroup = viewMode === "job" ? timeEntry.get("job") : timeEntry.get("user");
      if (timeEntryGroup) {
        // console.log(timeEntry);
        // console.log(timeEntry.get("user.id"));
      }

      if (!timeEntryGroup) {
        return;
        console.log("skip me");
      }
      else {
        console.log(timeEntryGroup);
        items.push({
          id: timeEntry.get("id"),
          group: timeEntryGroup.id,
          title: <ConnectedTimeLineItem timeEntry={timeEntry}/>,
          start: timeEntry.get("start") * 1000,
          end: (timeEntry.get("end")+ 900) * 1000,
          itemProps: {
          }
        })
      }
    });

    const groups = viewMode === "job" ? jobGroups : userGroups;

    return (
      <Timeline
        groups={groups}
        items={items}
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
