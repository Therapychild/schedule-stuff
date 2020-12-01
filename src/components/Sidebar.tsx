import React from "react";
import {TMode} from "../util/types";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {WindowedListBox} from "./WindowedListBox";
import Button from "@material-ui/core/Button";

// Drill unused props with lodash.
export interface Props {
  children?: any;
  viewMode: TMode;
  setViewMode: Function;
  open: boolean;
  closeSidebar: Function;
}

export function Sidebar(props: Props) {
  const {children, viewMode, open, closeSidebar} = props;

  // Composes a Calendar widget along with filters (a popup when icon is pressed)
  // @todo Pass WindowList as a child, along with the filters.
  return (
    <>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => {
          closeSidebar();
        }}
        transitionDuration={{enter: 500, exit: 300}}
        variant={"persistent"}
        ModalProps={{
          disableAutoFocus: true,
          disableRestoreFocus: true,
          disableEnforceFocus: true,
        }}
      >
        <Button onClick={() => {
          closeSidebar();
        }}>
          {!open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </Button>
        <div
          style={{width: "100%", backgroundColor: "red", textAlign: "center"}}>
          Filters
        </div>
        {children}
        <WindowedListBox viewMode={viewMode}/>
      </Drawer>
    </>
  );
}
