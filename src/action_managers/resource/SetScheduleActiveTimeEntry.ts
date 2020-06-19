import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const setScheduleActiveTimeEntry = "SET_SCHEDULE_ACTIVE_TIME_ENTRY";

export type Payload = {
  scheduleActiveTimeEntry: string;
  override: boolean;
};

export type SetScheduleActiveTimeEntryAction = {
  type: typeof setScheduleActiveTimeEntry;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class SetScheduleActiveTimeEntry extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, SetScheduleActiveTimeEntryAction> {

  defaultState = {
    scheduleActiveTimeEntry: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return setScheduleActiveTimeEntry;
  }

  create(payload: any, tags?: string[]): SetScheduleActiveTimeEntryAction {
    return super.create(payload, tags) as SetScheduleActiveTimeEntryAction;
  }

  handle(state: any, action: SetScheduleActiveTimeEntryAction): void {
    const { scheduleActiveTimeEntry } = action.payload;

    state.scheduleActiveTimeEntry = scheduleActiveTimeEntry;
  }
}
