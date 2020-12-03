import React from "react";
import {
  sidebarStateVar,
  viewModeVar
} from "../util/apolloStore";
import {useReactiveVar} from "@apollo/client";
import {JobList} from "./JobList";
import {UserList} from "./UserList";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export function Sidebar() {
  const viewMode = useReactiveVar(viewModeVar);
  const sidebarState = useReactiveVar(sidebarStateVar);

  const toggleSidebar = (): void => {
    sidebarStateVar(!sidebarStateVar());
  }

  /**
   * Prevent Sidebar from rendering when state changes when closed.
   */
  let List = <></>
  if (sidebarStateVar()) {
    List = viewModeVar() === "job" ? <UserList/> : <JobList/>
  }

  console.log("Rendering Sidebar.tsx");
  return (
    <Drawer
      anchor={"left"}
      open={sidebarStateVar()}
      transitionDuration={{enter: 500, exit: 300}}
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
        }}>
        {<ChevronLeftIcon/>}
      </Button>
      <div
        style={{width: "100%", backgroundColor: "red", textAlign: "center"}}>
        Filters
      </div>
      {List}
    </Drawer>
  );
}
