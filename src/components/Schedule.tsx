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
  resources: Resource[]; // Jobs or Users array
  timeEntries: Resource[]; // TimeEntries array
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

  /**
   * Runs the defaultGroupQuery.
   * Provides defaultTimeStart and defaultTimeEnd for the TimeLine.
   * Provides a groups[], based on Start/End Dates. for the
   * defaultTimeEntryQuery.
   */
  componentDidMount() {
    const {defaultQuery, defaultGroupQuery, channelizer} = this.props;

    defaultQuery(defaultGroupQuery, channelizer);
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

  render(): React.ReactNode {
    const { resources, timeEntries, viewMode,  defaultTimeStart, defaultTimeEnd } = this.props;

    // Format Groups[] to work with the timeLine
    let groups: any[] = [];
    Object.keys(resources).forEach((key) => {
      const group = resources[parseInt(key)];
      groups.push({
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
        groups={groups}
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
