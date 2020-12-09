import React from "react";
import { sidebarStateVar, viewModeVar } from "../util/apolloStore";
import { useReactiveVar } from "@apollo/client";
import Drawer from "@material-ui/core/Drawer";
import { JobList } from "./JobList";
import { UserList } from "./UserList";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

/**
 * Composes a Drawer in which to display the Lists of job or users, filters for
 * the Schedule, and a button to toggle it's state.
 *
 * @param:
 *  viewModeVar: A Reactive variable used to set or retrieve the viewMode state.
 *  sidebarStateVae: A Reactive variable used to set or retrieve the state of
 *    the Sidebar.
 *
 * @return ReactElement.
 */
export function Sidebar(): React.ReactElement {
  useReactiveVar(viewModeVar);
  useReactiveVar(sidebarStateVar);

  const toggleSidebar = (): void => {
    sidebarStateVar(!sidebarStateVar());
  };

  /**
   * Prevent Lists from rendering when when closed.
   */
  let List = <></>;
  if (sidebarStateVar()) {
    List = viewModeVar() === "job" ? <UserList /> : <JobList />;
  }

  return (
    <Drawer
      anchor={"left"}
      open={sidebarStateVar()}
      transitionDuration={{ enter: 400, exit: 0 }}
      variant={"persistent"}
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
