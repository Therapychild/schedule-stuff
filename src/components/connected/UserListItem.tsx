import {KeyValueAction} from "duckies/dist/action_managers/utility/KeyValue"

import {
  scheduleAssign,
  ScheduleAssignAction
} from "../../action_managers/resource/ScheduleAssign";

import {
  UserListItem,
  DispatchProps,
} from "../UserListItem";

import Resource from "duckies/dist/resource/Resource";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    scheduleAssign: (resource?: Resource, timeEntry?: Resource): void => {
      dispatch({
        type: scheduleAssign,
        payload: { resource, timeEntry },
      } as ScheduleAssignAction);
    },
    scheduleSetActiveResource: (timeEntry: string): void => {
      dispatch({
        type: "KEY_VALUE",
        payload: {
          key: "scheduleSetActiveResource",
          value: timeEntry
        },
      } as KeyValueAction);
    },
  };
};

export const ConnectedUserListItem = connect<{}, DispatchProps>(
  null,
  mapDispatchToProps
)(UserListItem);
