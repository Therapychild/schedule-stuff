import ReducibleActionManagerBase, {
  ReducibleActionManagerInterface
} from "duckies/dist/action_managers/base/ReducibleActionManagerBase";

export const toggleViewMode = "TOGGLE_VIEW_MODE";

export type Payload = {};

export type ToggleViewModeAction = {
  type: typeof toggleViewMode;
  payload: Payload;
};

/**
 * Sets active group.
 */
export class ToggleViewMode extends ReducibleActionManagerBase
  implements ReducibleActionManagerInterface<Payload, ToggleViewModeAction> {

  defaultState = {
    viewMode: "job"
  }

  /* istanbul ignore next */
  constructor() {
    super();
  }

  getType(): string {
    return toggleViewMode;
  }

  create(
    payload: any,
    tags?: string[],
  ): ToggleViewModeAction {
    return super.create(payload, tags) as ToggleViewModeAction;
  }

  handle(state: any, action: ToggleViewModeAction): void {
    state.viewMode = state.viewMode === "job" ? "user" : "job";
  }
}
