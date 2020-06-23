import {scheduleSetActiveGroup, ScheduleSetActiveGroupAction} from "../../action_managers/resource/ScheduleSetActiveGroup";
import {scheduleAssign, ScheduleAssignAction} from "../../action_managers/resource/ScheduleAssign";
import {connect} from "react-redux";
import {
  BaseListBox,
  StateProps,
  DispatchProps
} from "../BaseListBox";
import Resource from "duckies/dist/resource/Resource";

// @todo get groups from resources, see List.tsx from erp_client.
const mapStateToProps = (state: any): StateProps => {
  const { groups, viewMode, activeGroup } = state;

  return {
    groups,
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
    scheduleAssign: (group: Resource, timeEntry: Resource ): void => {
      dispatch({
        type: scheduleAssign,
        payload: { group, timeEntry },
      } as ScheduleAssignAction);
    }
  };
};

export const ConnectedBaseListBox = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BaseListBox);
