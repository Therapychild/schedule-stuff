import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleViewedTimeEntry = "SCHEDULE_VIEWED_TIME_ENTRY";

export type Payload = {
  timeEntry: Resource;
  override: boolean;
};

export type ScheduleViewedTimeEntryAction = {
  type: typeof scheduleViewedTimeEntry;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class ScheduleViewedTimeEntry extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleViewedTimeEntryAction> {

  defaultState = {
    activeViewedTimeEntry: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleViewedTimeEntry;
  }

  create(payload: any, tags?: string[]): ScheduleViewedTimeEntryAction {
    return super.create(payload, tags) as ScheduleViewedTimeEntryAction;
  }

  handle(state: any, action: ScheduleViewedTimeEntryAction): void {
    const { timeEntry, override } = action.payload;

    if (state.activeViewedTimeEntry && override) {
      state.activeViewedTimeEntry = timeEntry.id;
    }
    else if (!state.activeViewedTimeEntry) {
      state.activeViewedTimeEntry = timeEntry.id;
    }
  }
}
