import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleSetActiveTimeEntry = "SCHEDULE_SET_ACTIVE_TIME_ENTRY";

export type Payload = {
  timeEntry: Resource;
  override: boolean;
};

export type ScheduleSetActiveTimeEntryAction = {
  type: typeof scheduleSetActiveTimeEntry;
  payload: Payload;
};

/**
 * Sets active timeEntry.
 */
export class ScheduleSetActiveTimeEntry extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleSetActiveTimeEntryAction> {

  defaultState = {
    timeEntry: {}
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleSetActiveTimeEntry;
  }

  create(payload: any, tags?: string[]): ScheduleSetActiveTimeEntryAction {
    return super.create(payload, tags) as ScheduleSetActiveTimeEntryAction;
  }

  handle(state: any, action: ScheduleSetActiveTimeEntryAction): void {
    const { timeEntry } = action.payload;

    state.timeEntry = timeEntry;
  }
}
