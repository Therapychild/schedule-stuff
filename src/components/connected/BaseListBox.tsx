import {scheduleSetActiveGroup, ScheduleSetActiveGroupAction} from "../../action_managers/resource/ScheduleSetActiveGroup";
import {connect} from "react-redux";
import {
  BaseListBox,
  StateProps,
  DispatchProps
} from "../BaseListBox";

// @todo get groups from resources, see List.tsx from erp_client.
const mapStateToProps = (state: any): StateProps => {
  const { scheduleActiveGroup, groups, viewMode } = state;

  return {
    scheduleActiveGroup,
    groups,
    viewMode
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    assignActive: (scheduleActiveGroup: string): void => {
      dispatch({
        type: scheduleSetActiveGroup,
        payload: { scheduleActiveGroup },
      } as ScheduleSetActiveGroupAction);
    }
  };
};

export const ConnectedBaseListBox = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BaseListBox);
