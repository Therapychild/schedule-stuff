import React, { useState } from "react";
import { TMode } from "../util/types";
import Drawer from "@material-ui/core/Drawer";
import { JobList } from "./JobList";
import { UserList } from "./UserList";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export interface Props {
  viewMode: TMode;
}

/**
 * Composes a Drawer in which to display the Lists of job or users, filters for
 * the Schedule, and a button to toggle it's state.
 *
 * @param:
 *  viewModeVar: A Reactive variable used to set or retrieve the viewMode state.
 *  sidebarStateVae: A Reactive variable used to set or retrieve the state of
 *    the Sidebar.
 *
 * @return React.ReactElement.
 */
export function Sidebar(props: Props): React.ReactElement {
  const { viewMode } = props;

  const [{ open }, setOpen] = useState({ open: false });

  const toggleSidebar = (): void => {
    setOpen({ open: !open });
  };

  /**
   * Prevent Lists from rendering when when closed.
   */
  let List = <></>;
  if (open) {
    List =
      viewMode === "job" ? (
        <UserList className="entity-list" />
      ) : (
        <JobList className="entity-list" />
      );
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      transitionDuration={{ enter: 0, exit: 0 }}
      variant="persistent"
      ModalProps={{
        disableAutoFocus: true,
        disableRestoreFocus: true,
        disableEnforceFocus: true,
      }}
    >
      <Button
        className="sidebar-toggle"
        onClick={() => {
          toggleSidebar();
        }}
      >
        {<ChevronLeftIcon />}
      </Button>
      <div
        style={{ width: "100%", backgroundColor: "red", textAlign: "center" }}
      >
        Filters
      </div>
      {List}
    </Drawer>
  );
}
