import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const scheduleSetActiveGroup = "SCHEDULE_SET_ACTIVE_GROUP";

export type Payload = {
  group: string;
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
    activeGroup: "",
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
    const { group, override } = action.payload;

    if (state.activeGroup && override) {
      state.group = group;
    }
    else if (!state.activeGroup){
      state.group = group;
    }
  }
}
