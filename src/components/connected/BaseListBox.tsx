import {setScheduleActiveGroup, SetScheduleActiveGroupAction} from "../../action_managers/resource/SetScheduleActiveGroup";
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
        type: setScheduleActiveGroup,
        payload: { scheduleActiveGroup },
      } as SetScheduleActiveGroupAction);
    }
  };
};

export const ConnectedBaseListBox = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BaseListBox);
