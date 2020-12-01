import React, {useState} from "react";
import {Sidebar} from "./components/Sidebar";
import {Schedule} from "./components/Schedule";
import {TMode} from "./util/types";
import {Button} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

declare const window: Window;

export default function ScheduleApp() {
  const [{viewMode}, setViewMode] = useState<{ viewMode: TMode }>({viewMode: "job"});
  const [{open}, setOpen] = useState({open: false});

  function toggleViewMode() {
    if (viewMode === "user") {
      setViewMode({viewMode: "job"});
    } else {
      setViewMode({viewMode: "user"});
    }
  }

  const openSidebar = (): void => {
    setOpen({open: true});
  }

  const closeSidebar = (): void => {
    setOpen({open: false});
  }

  return (
    <>
      <Button onClick={() => {
        openSidebar();
      }}>
        {!open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
      </Button>
      <Button onClick={() => {
        toggleViewMode()
      }}>{viewMode}</Button>
      <Sidebar
        open={open}
        viewMode={viewMode}
        setViewMode={setViewMode}
        closeSidebar={closeSidebar}
      />
      <Schedule
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </>
  );
}
