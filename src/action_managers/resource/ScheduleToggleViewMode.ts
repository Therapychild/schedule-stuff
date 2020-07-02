import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
import {TMode} from "../../types/mode";

export const scheduleToggleViewMode = "SCHEDULE_TOGGLE_VIEW_MODE";

export type Payload = {
  viewMode: TMode;
};

export type ScheduleToggleViewModeAction = {
  type: typeof scheduleToggleViewMode;
  payload: Payload;
};

/**
 * Toggles viewMode in Schedule.
 */
export class ScheduleToggleViewMode extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ScheduleToggleViewModeAction> {

  defaultState = {
    viewMode: "job"
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleToggleViewMode;
  }

  create(
    payload: any,
    tags?: string[],
  ): ScheduleToggleViewModeAction {
    return super.create(payload, tags) as ScheduleToggleViewModeAction;
  }

  handle(state: any, action: ScheduleToggleViewModeAction): void {
    state.viewMode = state.viewMode === "job" ? "user" : "job";
  }
}
