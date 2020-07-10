import {KeyValueAction} from "duckies/dist/action_managers/utility/KeyValue"

import {connect} from "react-redux";
import {
  BaseListBox,
  StateProps,
  DispatchProps
} from "../BaseListBox";

const mapStateToProps = (state: any): StateProps => {
  const { viewMode, resources, activeResource, activeTimeEntry  } = state;

  return {
    viewMode,
    resources,
    activeResource,
    activeTimeEntry
  };
};

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
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

export const ConnectedBaseListBox = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(BaseListBox);
