import React from "react";
import QueryInterface from "duckies/dist/interfaces/QueryInterface";
import { DefaultQueryAction } from "duckies/dist/action_managers/resource/DefaultQuery";
import Channelizer from "duckies/dist/utility/channelizer";
import { connect } from "react-redux";

import {ConnectedTimeLineItem} from "../connected/TimeLineItem";

import {
  Schedule,
  StateProps,
  DispatchProps
} from "../Schedule";

export interface OwnProps {
  channelizer: Channelizer;
}

const mapStateToProps = (state: any): StateProps => {
  const { groups, timeEntries, viewMode } = state;
  const groupResources: any = []

  // Transform the jobs/users groups object to an array that the Timeline
  // sidebar uses.
  if (viewMode === "jobs") {
    Object.keys(groupResources).forEach((key: string) => {
      groups.push({
        id: key,
        title: groupResources[key].name
      });
    })
  }
  else {
    Object.keys(groupResources).forEach((key: string) => {
      groups.push({
        id: key,
        title: groupResources[key].name
      });
    })
  }

  // Transform the timeEntries object to an array.
  let itemResources: any = [];

  Object.keys(timeEntries).forEach((key: string) => {
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

  // Map the defaultStart and defaultEnd from the query


  return {
    groupResources,
    itemResources,
    viewMode,
    visibleTimeStart,
    visibleTimeEnd
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    defaultQuery: (query: QueryInterface): void => {
      channelizer.connect("COLLECTION_REQUEST", query.queryId);
      dispatch({
        type: "DEFAULT_QUERY",
        payload: query,
        meta: {
          mode: "default"
        }
      } as DefaultQueryAction);
    }
  };
};

export const ConnectedSchedule = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
