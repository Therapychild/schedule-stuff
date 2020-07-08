import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";

export const scheduleAssign = "SCHEDULE_ASSIGN";

export type Payload = {
  resource?: Resource;
  timeEntry?: Resource;
};

export type ScheduleAssignAction = {
  type: typeof scheduleAssign;
  payload: Payload;
};

/**
 * Assigns resource and or timeEntry.
 */
export class ScheduleAssign extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleAssignAction> {

  defaultState = {
    resource: {},
    timeEntry: {}
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
    const timeEntry: Resource = action.payload.timeEntry ? action.payload.timeEntry : state.resources.timeEntry[state.keyValue.activeTimeEntry];
    const activeType = state.keyValue.viewMode === "job" ? "user" : "job";
    const resource: Resource = action.payload.resource ? action.payload.resource : state.resources[activeType][state.keyValue.activeResource];

    // If payload does not provide a resource or a timeEntry, do nothing.
    if (!resource || !timeEntry) {
      return;
    }

    timeEntry.set(resource.type, resource)
  }
}
