import { Component } from 'react';
import './App.css';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
export interface OwnProps {
    activeGroup: string;
    groups: [{}];
    viewMode: "user" | "job";
}
export default class Schedule extends Component<OwnProps, {}> {
    constructor(props: OwnProps);
    render(): JSX.Element;
}
