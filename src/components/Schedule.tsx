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
import {ConnectedTimeLineItem} from "./connected/TimeLineItem";
import Channelizer from "duckies/dist/utility/channelizer";
import Resource from "duckies/dist/resource/Resource";

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

export interface OwnProps {
  defaultGroupQuery: QueryInterface;
  defaultTimeEntryQuery: QueryInterface;
}

export interface StateProps {
  groups: Resource[]; // Will be either a Jobs or Users array
  timeEntries: Resource[]; // Will be a TimeEntries array
  viewMode: TMode;
  defaultTimeStart: Moment;
  defaultTimeEnd: Moment;
  channelizer: Channelizer;
}

export interface DispatchProps {
  defaultQuery: (query: QueryInterface, channelizer: Channelizer) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

export  class Schedule extends React.Component<Props, {}> {

  // These need to be worked out when GraphQL queries are completed.


  componentDidMount() {
    const {defaultQuery, defaultGroupQuery, channelizer} = this.props;
    // Run the groupQuery
    // Provides a groups(jobs/users) resource[]
    // Provides a timeEntries resource[] based on dates and groups.
    // Provides timeStartDate and timeEndDate for TimeLine

    defaultQuery(defaultGroupQuery, channelizer);
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

  render(): React.ReactNode {
    const { groups, timeEntries, viewMode,  defaultTimeStart, defaultTimeEnd } = this.props;

    // Format Groups[] to work with the timeLine
    let newGroups: any[] = [];
    Object.keys(groups).forEach((key) => {
      const group = groups[parseInt(key)];
      newGroups.push({
        value: group.get("id"),
        label: group.get("name"),
        data: group
      })
    });

    // Format the timeEntries Resource[] to work with the timeline as an item[]
    let timeEntryItems: any[] = [];
    Object.keys(timeEntries).forEach((key: string) => {
      const timeEntry = timeEntries[parseInt(key)];
      const timeEntryGroup = timeEntry.get(viewMode);

      timeEntryItems.push({
        id: timeEntry.get("id"),
        group: timeEntryGroup.id,
        title: <ConnectedTimeLineItem timeEntry={timeEntry}/>,
        start: timeEntry.get("start") * 1000,
        end: (timeEntry.get("end") + 900) * 1000,
        itemProps: {}
      });
    });

    return (
      <Timeline
        groups={newGroups}
        items={timeEntryItems}
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
