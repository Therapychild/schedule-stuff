import React, {useState, Fragment} from "react";
import {TMode} from "../types/mode";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import {IconButton} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {WindowedListBox} from "./WindowedListBox";

// Drill unused props with lodash.
export interface Props {
  children?: any;
  viewMode: TMode;
  setViewMode: Function;
}

export function Sidebar(props: Props) {
  const {children, viewMode} = props;
  const [open, setOpen] = useState(false);

  const toggleSidebar = (): void => {
    setOpen(!open);
  }

  // Opens to width of timeline column.
  // Composes the BaseListBox which includes filters, and ListItems
  // Composes a Calendar widget along with filters (a popup when icon is pressed)

  // @todo: If window width > xxx, variant is persistent, otherwise temporary.
  const variant = "temporary";

  // @todo: When mode is saved to cache, move button off of Sidebar to somewhere
  // better suited.
  return (
    <Fragment>
      <IconButton onClick={() => {
        toggleSidebar();
      }}>
        {!open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
      </IconButton>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => {
          toggleSidebar();
        }}
        transitionDuration={{enter: 500, exit: 300}}
        variant={variant}
      >
        <div
          style={{width: "100%", backgroundColor: "red", textAlign: "center"}}>
          Filters
        </div>
        {children}
        <WindowedListBox viewMode={viewMode}/>
      </Drawer>
    </Fragment>
  );
}
