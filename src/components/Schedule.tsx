import React from "react";
import {TMode} from "../types/mode";
import QueryInterface from "duckies/dist/interfaces/QueryInterface";
import {Moment} from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";

import "react-calendar-timeline/lib/Timeline.css";

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

export interface StateProps {
  groupResources: []; // Will be either a Jobs or Users array
  itemResources: []; // Will be a TimeEntries array
  viewMode: TMode;
  visibleTimeStart: Moment;
  visibleTimeEnd: Moment;
}

export interface DispatchProps {
  defaultQuery: (query: QueryInterface) => void;
}

type Props = StateProps & DispatchProps;

export  class Schedule extends React.Component<Props, {}> {

  // These need to be worked out when GraphQL queries are completed.
  defaultGroupQuery?: QueryInterface;
  defaultTimeEntryQuery?: QueryInterface;

  componentDidMount() {
    const {defaultQuery} = this.props;
    // Run the groupQuery
    // Provides a groups(jobs/users) resource[]
    // Provides a timeEntries resource[] based on dates and groups.
    // Provides timeStartDate and timeEndDate for TimeLine

    defaultQuery(this.defaultGroupQuery);
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
    const { groupResources, itemResources, visibleTimeStart, visibleTimeEnd } = this.props;

    return (
      <Timeline
        groups={groupResources}
        items={itemResources}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={true}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
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

