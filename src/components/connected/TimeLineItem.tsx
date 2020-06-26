import {
  scheduleSetActiveTimeEntry,
  ScheduleSetActiveTimeEntryAction
} from "../../action_managers/resource/ScheduleSetActiveTimeEntry";

import {
  scheduleSetActiveGroup,
  ScheduleSetActiveGroupAction
} from "../../action_managers/resource/ScheduleSetActiveGroup";

import {
  scheduleAssign,
  ScheduleAssignAction
} from "../../action_managers/resource/ScheduleAssign";

import {
  scheduleViewTimeEntry,
  ScheduleViewTimeEntryAction
} from "../../action_managers/resource/ScheduleViewTimeEntry";

import {
  TimeLineItem,
  DispatchProps,
  StateProps
} from "../TimeLineItem";

import Resource from "duckies/dist/resource/Resource";
import {connect} from "react-redux";

// @todo get groups from resources, see List.tsx from erp_client.
const mapStateToProps = (state: any): StateProps => {
  const { viewMode, activeGroup} = state;

  return {
    viewMode,
    activeGroup
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    scheduleSetActiveGroup: (group: string): void => {
      dispatch({
        type: scheduleSetActiveGroup,
        payload: {
          group,
          override: true
        },
      } as ScheduleSetActiveGroupAction);
    },
    scheduleSetActiveTimeEntry: (timeEntry: Resource): void => {
      dispatch({
        type: scheduleSetActiveTimeEntry,
        payload: {
          timeEntry,
          override: true
        },
      } as ScheduleSetActiveTimeEntryAction);
    },
    scheduleViewTimeEntry: (timeEntry: Resource): void => {
      dispatch({
        type: scheduleViewTimeEntry,
        payload: {
          timeEntry: timeEntry.get("id"),
          override: true
        },
      } as ScheduleViewTimeEntryAction);
    },
    scheduleAssign: (group: Resource, timeEntry: Resource ): void => {
      dispatch({
        type: scheduleAssign,
        payload: { group, timeEntry },
      } as ScheduleAssignAction);
    }
  };
};

export const ConnectedTimeLineItem = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(TimeLineItem);
