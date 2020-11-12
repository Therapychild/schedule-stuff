import React, {useState, Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List'; // BaseListBox

// Drill unused props with lodash.
export interface Props {
  children?: any;
}

export function Sidebar(props: Props) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const toggleSidebar = (): void => {
    setOpen(!open);
  }

  // Opens to width of timeline column.
  // Composes the BaseListBox which includes filters, and ListItems
  // Composes a Calendar widget along with filters (a popup when icon is pressed)

  // @todo: If window width > xxx, variant is persistent, otherwise temporary.
  const variant = "temporary";

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
        <div style={{width: 250, backgroundColor: "red", textAlign: "center"}}>
          Hello
        </div>
        {children}
      </Drawer>
    </Fragment>
  );
}
