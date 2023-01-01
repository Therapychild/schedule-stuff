import ReducibleActionManagerBase, { ReducibleActionManagerInterface } from "duckies/dist/action_managers/base/ReducibleActionManagerBase";
export declare const setActiveGroup = "SET_ACTIVE_GROUP";
export declare type Payload = {
    activeGroup: string;
};
export declare type SetActiveGroupAction = {
    type: "SET_ACTIVE_GROUP";
    payload: Payload;
};
/**
 * Sets active group.
 */
export default class SetActiveGroup extends ReducibleActionManagerBase implements ReducibleActionManagerInterface<Payload, SetActiveGroupAction> {
    defaultState: {
        activeGroup: string;
    };
    constructor();
    getType(): string;
    create(payload: any, tags?: string[]): SetActiveGroupAction;
    handle(state: any, action: SetActiveGroupAction): void;
}
