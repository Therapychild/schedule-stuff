import React from 'react';
export interface DispatchProps {
    setActiveGroup: (activeGroup: string) => void;
}
export interface StateProps {
    activeGroup: string;
    groups: any;
    viewMode: "user" | "job";
}
declare type Props = StateProps & DispatchProps;
export default class BaseListBox extends React.Component<Props, {}> {
    render(): React.ReactNode;
}
export {};
