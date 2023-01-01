import { SetActiveGroupAction } from "../../action_managers/resource/SetActiveGroup";
import { connect } from "react-redux";
import BaseListBox, {
  StateProps,
  DispatchProps
} from "../BaseListBox";

// @todo get groups from resources, see List.tsx from erp_client.
const mapStateToProps = (state: any): StateProps => {
  const { activeGroup, groups, viewMode } = state;

  return {
    activeGroup,
    groups,
    viewMode
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    setActiveGroup: (activeGroup: string): void => {
      dispatch({
        type: "SET_ACTIVE_GROUP",
        payload: { activeGroup },
      } as SetActiveGroupAction);
    }
  };
};

export const ConnectedBaseListBox = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BaseListBox);
