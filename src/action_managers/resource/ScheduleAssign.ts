import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleAssign = "SCHEDULE_ASSIGN";

export type Payload = {
  timeEntry: Resource;
  group: {id: ""};
};

export type ScheduleAssignAction = {
  type: typeof scheduleAssign;
  payload: Payload;
};

/**
 * Assigns group.
 * If in job mode, group is job, and timeEntry is selected timeEntry
 * If in user mode, group is user, and timeEntry is selected timeEntry
 *
 */
export class ScheduleAssign extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleAssignAction> {

  defaultState = {
    timeEntry: {
      id: "",
      data: {
        id: ""
      }
    },
    group: {id: ""}
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleAssign;
  }

  create(payload: any, tags?: string[]): ScheduleAssignAction {
    return super.create(payload, tags) as ScheduleAssignAction;
  }

  handle(state: any, action: ScheduleAssignAction): void {
    const { timeEntry, group } = action.payload;

    if(!(group.id in state.group)) {
      return;
    }
    timeEntry.data.id = state.group.id;
  }
}
