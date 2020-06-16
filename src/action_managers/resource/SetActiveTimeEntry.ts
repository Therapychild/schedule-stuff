import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const setActiveTimeEntry = "SET_ACTIVE_TIME_ENTRY";

export type Payload = {
  activeTimeEntry: string;
  override: boolean;
};

export type SetActiveTimeEntryAction = {
  type: "SET_ACTIVE_TIME_ENTRY";
  payload: Payload;
};

/**
 * Sets active group.
 */
export default class SetActiveTimeEntry extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, SetActiveTimeEntryAction> {

  defaultState = {
    activeTimeEntry: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return setActiveTimeEntry;
  }

  create(payload: any, tags?: string[]): SetActiveTimeEntryAction {
    return super.create(payload, tags) as SetActiveTimeEntryAction;
  }

  handle(state: any, action: SetActiveTimeEntryAction): void {
    const { activeTimeEntry } = action.payload;

    state.activeTimeEntry = activeTimeEntry;
  }
}
