import {KeyValueAction} from "duckies/dist/action_managers/utility/KeyValue"
import {
  scheduleAssign,
  ScheduleAssignAction
} from "../../action_managers/resource/ScheduleAssign";
import {connect} from "react-redux";
import Resource from "duckies/dist/resource/Resource";

import {
  UserListItem,
  DispatchProps,
} from "../UserListItem";

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    // scheduleAssign: (resource?: Resource, timeEntry?: Resource): void => {
    //   dispatch({
    //     type: scheduleAssign,
    //     payload: { resource, timeEntry },
    //   } as ScheduleAssignAction);
    // },
    scheduleSetActiveResource: (resource: string): void => {
      dispatch({
        type: "KEY_VALUE",
        payload: {
          key: "scheduleSetActiveResource",
          value: resource
        },
      } as KeyValueAction);
    },
  };
};

export const ConnectedUserListItem = connect<{}, DispatchProps>(
  null,
  mapDispatchToProps
)(UserListItem);
