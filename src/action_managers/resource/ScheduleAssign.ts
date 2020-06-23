import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import Resource from "duckies/dist/resource/Resource";
import {
  ScheduleSetActiveTimeEntry,
  scheduleSetActiveTimeEntry
} from "./ScheduleSetActiveTimeEntry";
import {ScheduleSetActiveGroup} from "./ScheduleSetActiveGroup";
import {UserListItem} from "../../components/UserListItem";
import {JobListItem} from "../../components/JobListItem";

export const scheduleAssign = "SCHEDULE_ASSIGN";

export type Payload = {
  group?: Resource;
  timeEntry?: Resource;
};

export type ScheduleAssignAction = {
  type: typeof scheduleAssign;
  payload: Payload;
};

/**
 * Assigns group and or timeEntry.
 * If Payload has both a TimeEntry and a group, set the group to
 * scheduleSetActiveTimeEntry
 *
 * If Payload has a TimeEntry and an activeGroup in state, set group to
 * scheduleSetActiveTimeEntry
 *
 * If there is an Group, and an activeTimeEntry in state, set timeEntry to
 * scheduleSetActiveGroup.
 */
export class ScheduleAssign extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleAssignAction> {

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
    let { group, timeEntry } = action.payload;

    // If payload does not provide a group or a timeEntry, do nothing.
    if (!(group && timeEntry)) {
      return;
    }

    // If no group is provided from payload, get the activeGroup from state.
    if (!group) {
      const mode = state.viewMode;
      const activeGroup = state.activeGroup;
      if (mode === "user") {
        group = state.resources.job[activeGroup]
      }
      else {
        group = state.resources.user[activeGroup];
      }
    }

    // If no timeEntry is provided in the payload, get the activeTimeEntry from state.
    if (!timeEntry) {
      timeEntry = state.resources.timeEntry[state.activeTimeEntry];
    }
    timeEntry.set(group.type, group)
  }
}
