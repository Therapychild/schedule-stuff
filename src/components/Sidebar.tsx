import React, {useState, Fragment} from "react";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import {VirtualizedList} from "./VirtualizedList";
import {TMode} from "../types/mode";

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
      <Button
        onClick={() => {
          toggleSidebar();
        }}
      >
        Toggle
      </Button>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={() => {
          toggleSidebar();
        }}
        transitionDuration={{enter: 1.5, exit: .5}}
        variant={variant}
      >
        <div
          style={{width: "100%", backgroundColor: "red", textAlign: "center"}}>
          Filters
        </div>
        {children}
        <VirtualizedList viewMode={viewMode}/>
      </Drawer>
    </Fragment>
  );
}
