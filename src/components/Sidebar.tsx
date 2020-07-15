import React, {Component} from "react";
import {Sidebar as PrimeSidebar} from "primereact/sidebar";
import SidebarToggle from "./SidebarToggle";

export interface SidebarProps {
  className?: string;
  children?: any;
}

export interface SidebarState {
  visible: boolean;
}

export class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      visible: false
    };

    this.hide = this.hide.bind(this);
  }

  static defaultProps = {
    children: null
  };

  handleClick = (): void => {
    this.setState(prevState => {
      return { visible: !prevState.visible };
    });
  }

  hide = (): void => {
    this.setState({ visible: false });
  }

  render(): React.ReactNode {
    const visible = this.state.visible;
    const { children } = this.props;

    return (
      <PrimeSidebar
        visible={visible}
        onHide={this.hide}
        showCloseIcon={false}
        dismissable
      >
        <SidebarToggle visible={visible} handleClick={this.handleClick} />
        {children}
      </PrimeSidebar>
    );
  }
}
