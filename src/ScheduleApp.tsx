import React, {useState} from "react";
import {
  makeVar
} from "@apollo/client";
import {Sidebar} from "./components/Sidebar";
import {Schedule} from "./components/Schedule";
import {TMode} from "./types/mode";

export default function ScheduleApp() {
  const [{viewMode}, setViewMode] = useState<{viewMode: TMode}>({viewMode: "user"});

  return (
    <>
      <Sidebar />
      <Schedule viewMode={viewMode} setViewMode={setViewMode} />
    </>
  );
}
