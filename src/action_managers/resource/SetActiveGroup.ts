import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const setActiveGroup = "SET_ACTIVE_GROUP";

export type Payload = {
  activeGroup: string;
};

export type SetActiveGroupAction = {
  type: "SET_ACTIVE_GROUP";
  payload: Payload;
};

/**
 * Sets active group.
 */
export default class SetActiveGroup extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, SetActiveGroupAction> {

  defaultState = {
    activeGroup: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return setActiveGroup;
  }

  create(payload: any, tags?: string[]): SetActiveGroupAction {
    return super.create(payload, tags) as SetActiveGroupAction;
  }

  handle(state: any, action: SetActiveGroupAction): void {
    const { activeGroup } = action.payload;

    state.activeGroup = activeGroup;
  }
}
