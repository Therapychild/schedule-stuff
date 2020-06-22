import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleSetActiveGroup = "SCHEDULE_SET_ACTIVE_GROUP";

export type Payload = {
  timeEntry: Resource;
  override: boolean;
};

export type ScheduleSetActiveGroupAction = {
  type: typeof scheduleSetActiveGroup;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class ScheduleSetActiveGroup extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleSetActiveGroupAction> {

  defaultState = {
    timeEntry: {}
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleSetActiveGroup;
  }

  create(payload: any, tags?: string[]): ScheduleSetActiveGroupAction {
    return super.create(payload, tags) as ScheduleSetActiveGroupAction;
  }

  handle(state: any, action: ScheduleSetActiveGroupAction): void {
    const { timeEntry } = action.payload;

    state.timeEntry = timeEntry;
  }
}
