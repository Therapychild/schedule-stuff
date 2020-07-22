import React from "react";
import QueryInterface from "duckies/dist/interfaces/QueryInterface";
import Channelizer from "duckies/dist/utility/channelizer";
import Resource from "duckies/dist/resource/Resource";
import {TMode} from "../types/mode";
import {Moment} from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import {ConnectedTimeLineItem} from "./connected/TimeLineItem";
import {ConnectedToggleButton} from "./connected/ToggleButton";

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

export interface OwnProps {
  defaultGroupQuery: QueryInterface;
  defaultTimeEntryQuery: QueryInterface;
}

export interface StateProps {
  resources: Resource[]; // Jobs or Users depending on viewMode
  timeEntries: Resource[];
  viewMode: TMode;
  defaultTimeStart: Moment;
  defaultTimeEnd: Moment;
  channelizer: Channelizer;
}

export interface DispatchProps {
  defaultQuery: (query: QueryInterface, channelizer: Channelizer) => void;
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

    if (viewMode === "job") {
      Object.keys(resources).forEach((key: string, index: number) => {
        const user: Resource = resources[key];
        groups.push({
          id: user.get("id"),
          title: <span className="group-name">{user.get("name")}</span>,
          data: user,
          group: user.id
        });
      })
    }
    else {
      Object.keys(resources).forEach((key: string, index: number) => {
        let job: Resource = resources[key];
        groups.push({
          id: job.get("id"),
          title: <span className="group-name">{job.get("name.name")}</span>,
          data: job
        });
      })
    }

    // Format the timeEntries Resource[] to work with the timeline as an item[]
    let items: any[] = []
    Object.keys(timeEntries).forEach((key: string, index: number) => {
      const timeEntry: Resource = timeEntries[key];
      const timeEntryGroup = viewMode === "job" ? timeEntry.get("job") : timeEntry.get("user");

      // @todo This check is probably not necessary in the final code because
      // timeEntries will not exist without a Job.
      if (!timeEntryGroup || (viewMode === "user" && !timeEntry.get("job"))) {
        return;
      }

      items.push({
        id: timeEntry.get("id"),
        group: timeEntryGroup.id,
        title: <ConnectedTimeLineItem timeEntry={timeEntry}/>,
        start: timeEntry.get("start") * 1000,
        end: (timeEntry.get("end")+ 900) * 1000,
        itemProps: {
        }
      })
    });

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
        sidebarWidth={208}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>
                <ConnectedToggleButton className="view-mode-toggle" label="Toggle" />
              </div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" height={40}/>
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}
