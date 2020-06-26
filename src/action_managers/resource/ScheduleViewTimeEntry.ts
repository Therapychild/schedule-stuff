import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleViewTimeEntry = "SCHEDULE_VIEW_TIME_ENTRY";

export type Payload = {
  timeEntry: Resource;
  override: boolean;
};

export type ScheduleViewTimeEntryAction = {
  type: typeof scheduleViewTimeEntry;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class ScheduleViewTimeEntry extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleViewTimeEntryAction> {

  defaultState = {
    activeViewTimeEntry: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleViewTimeEntry;
  }

  create(payload: any, tags?: string[]): ScheduleViewTimeEntryAction {
    return super.create(payload, tags) as ScheduleViewTimeEntryAction;
  }

  handle(state: any, action: ScheduleViewTimeEntryAction): void {
    const { timeEntry, override } = action.payload;

    if (state.activeViewTimeEntry && override) {
      state.activeViewTimeEntry = timeEntry.get("id");
    }
    else if (!state.activeViewTimeEntry) {
      state.activeViewTimeEntry = timeEntry.get("id");
    }
  }
}
