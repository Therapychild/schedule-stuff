import {KeyValueAction} from "duckies/dist/action_managers/utility/KeyValue"

import {
  scheduleAssign,
  ScheduleAssignAction
} from "../../action_managers/resource/ScheduleAssign";

import {
  TimeLineItem,
  DispatchProps,
  StateProps, OwnProps
} from "../TimeLineItem";

import Resource from "duckies/dist/resource/Resource";
import {connect} from "react-redux";

const mapStateToProps = (state: any, ownProps: OwnProps): StateProps => {
  const { viewMode, activeTimeEntry, viewedTimeEntry } = state;
  const isActive = state.keyValue.activeTimeEntry === ownProps.timeEntry.get("id");
  const isViewed = state.keyValue.viewedTimeEntry === ownProps.timeEntry.get("id");

  return {
    viewMode,
    // activeResource,
    activeTimeEntry,
    viewedTimeEntry,
    isActive,
    isViewed,
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    // scheduleAssign: (resource?: Resource, timeEntry?: Resource ): void => {
    //   dispatch({
    //     type: scheduleAssign,
    //     payload: { resource, timeEntry },
    //   } as ScheduleAssignAction);
    // },
    // scheduleSetActiveResource: (timeEntry: string): void => {
    //   dispatch({
    //     type: "KEY_VALUE",
    //     payload: {
    //       key: "scheduleSetActiveResource",
    //       value: timeEntry
    //     },
    //   } as KeyValueAction);
    // },
    // scheduleSetActiveTimeEntry: (timeEntry: string): void => {
    //   dispatch({
    //     type: "KEY_VALUE",
    //     payload: {
    //       key: "scheduleSetActiveTimeEntry",
    //       value: timeEntry
    //     },
    //   } as KeyValueAction);
    // },
    scheduleViewTimeEntry: (timeEntry: string): void => {
      dispatch({
        type: "KEY_VALUE",
        payload: {
          key: "scheduleViewTimeEntry",
          value: timeEntry
        },
      } as KeyValueAction);
    },
  };
};

export const ConnectedTimeLineItem = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLineItem);
