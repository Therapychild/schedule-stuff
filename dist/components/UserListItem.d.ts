import React from "react";
export interface OwnProps {
    label: string;
}
declare type Props = OwnProps;
export declare class UserListItem extends React.Component<Props, {}> {
    static listItemTemplate(item: any): any;
    render(): React.ReactNode;
}
export {};
