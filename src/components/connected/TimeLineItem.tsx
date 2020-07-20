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
  const { viewMode } = state;
  const isActive = state.keyValue.scheduleSetActiveTimeEntry === ownProps.timeEntry.get("id");
  const isViewed = state.keyValue.scheduleViewTimeEntry === ownProps.timeEntry.get("id");
  const selectionType = viewMode === "job" ? "user" : "job";
  let inActiveSelection;

  if (ownProps.timeEntry.get(selectionType)) {
    inActiveSelection = state.keyValue.scheduleSetActiveResource === ownProps.timeEntry.get(`${selectionType}.id`);
  }
  else {
    inActiveSelection = state.keyValue.scheduleSetActiveResource === "";
  }

  return {
    viewMode,
    isActive,
    isViewed,
    inActiveSelection
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
    scheduleSetActiveResource: (timeEntry: string): void => {
      dispatch({
        type: "KEY_VALUE",
        payload: {
          key: "scheduleSetActiveResource",
          value: timeEntry
        },
      } as KeyValueAction);
    },
    scheduleSetActiveTimeEntry: (timeEntry: string): void => {
      dispatch({
        type: "KEY_VALUE",
        payload: {
          key: "scheduleSetActiveTimeEntry",
          value: timeEntry
        },
      } as KeyValueAction);
    },
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
