import React from "react";
import {
  makeVar
} from "@apollo/client";
import {Schedule} from "./components/Schedule";
import {TMode} from "./types/mode";

export default function ScheduleApp() {
  const viewMode = makeVar<TMode>("jobs");

  return (
    <Schedule />
  );
}
