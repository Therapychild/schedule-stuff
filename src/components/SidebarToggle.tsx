import React from "react";

export interface SidebarToggleProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  visible: boolean;
}

export default class SidebarToggle extends React.Component<
  SidebarToggleProps,
  {}
  > {
  render(): React.ReactNode {
    const { handleClick, visible } = this.props;

    return (
      <button
        type="button"
        className="sidebar-toggle"
        aria-label={visible ? "Hide the Sidebar" : "Show the Sidebar"}
        onClick={handleClick}
      >
        <div className="animation" />
      </button>
    );
  }
}
