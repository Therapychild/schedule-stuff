import React, {useState} from "react";
import {
  makeVar
} from "@apollo/client";
import {Sidebar} from "./components/Sidebar";
import {Schedule} from "./components/Schedule";
import {TMode} from "./types/mode";
import {Button} from "@material-ui/core";

export default function ScheduleApp() {
  const [{viewMode}, setViewMode] = useState<{ viewMode: TMode }>({viewMode: "job"});

  function toggleViewMode() {
    if(viewMode === "user") {
      setViewMode({viewMode: "job"});
    } else {
      setViewMode({viewMode: "user"});
    }
  }

  return (
    <>
      <Button onClick={() => {toggleViewMode()}}>{viewMode}</Button>
      <Sidebar viewMode={viewMode} setViewMode={setViewMode}/>
      <Schedule viewMode={viewMode} setViewMode={setViewMode}/>
    </>
  );
}
