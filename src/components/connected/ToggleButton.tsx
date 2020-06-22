import {ScheduleToggleViewModeAction} from "../../action_managers/resource/ScheduleToggleViewMode";
import {connect} from "react-redux";
import {Button} from "primereact/button";

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    onClick: (): void => {
      dispatch({
        type: "SCHEDULE_TOGGLE_VIEW_MODE",
        payload: {},
      } as ScheduleToggleViewModeAction);
    }
  };
};

export const ConnectedToggleButton = connect<any, any, any>(
  null,
  mapDispatchToProps
)(Button);
