import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const scheduleSetActiveGroup = "SET_SCHEDULE_ACTIVE_GROUP";

export type Payload = {
  scheduleActiveGroup: string;
  override: boolean;
};

export type SetScheduleActiveGroupAction = {
  type: typeof scheduleSetActiveGroup;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class SetScheduleActiveGroup extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, SetScheduleActiveGroupAction> {

  defaultState = {
    scheduleActiveGroup: ""
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return scheduleSetActiveGroup;
  }

  create(payload: any, tags?: string[]): SetScheduleActiveGroupAction {
    return super.create(payload, tags) as SetScheduleActiveGroupAction;
  }

  handle(state: any, action: SetScheduleActiveGroupAction): void {
    const { scheduleActiveGroup } = action.payload;

    state.scheduleActiveGroup = scheduleActiveGroup;
  }
}
