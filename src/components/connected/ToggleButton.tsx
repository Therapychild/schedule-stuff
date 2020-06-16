import { Button } from "primereact/button";
import {ToggleViewModeAction} from "../../action_managers/resource/ToggleViewMode";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    onClick: (): void => {
      dispatch({
        type: "TOGGLE_VIEW_MODE",
        payload: {},
      } as ToggleViewModeAction);
    }
  };
};

export const ConnectedToggleButton = connect<any, any, any>(
  null,
  mapDispatchToProps
)(Button);
