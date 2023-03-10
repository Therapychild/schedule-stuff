import React, { useState } from "react";
import {
  jobsArrayVar,
  usersArrayVar,
  timeEntriesArrayVar,
} from "./util/apolloStore";
import { ApolloError, QueryResult, useQuery } from "@apollo/client";
import {
  GET_JOBS,
  SCHEDULE_GET_TIME_ENTRIES,
  SCHEDULE_GET_USERS,
} from "./util/clientSchema";
import { TMode } from "./util/types";
import Button from "@material-ui/core/Button";
import { Sidebar } from "./components/Sidebar";
import { CircularProgress } from "@material-ui/core";
import { Schedule } from "./components/Schedule";

/**
 * Composes the Schedule and Sidebar components, and handles the graphql data
 * queries.
 *
 * @param:
 *   viewModeVar: A Reactive variable used to set or retrieve the viewMode state.
 *   sidebarStateVae: A Reactive variable used to set or retrieve the state of
 *     the Sidebar.
 *   jobsArrayVar: A Reactive variable used to set or retrieve a list of jobs.
 *   usersArrayVar: A Reactive variable used to set or retrieve a list of users.
 *   timeEntriesArrayVar: A Reactive variable used to set or retrieve a list of
 *     timeEntries.
 *
 * @returns React.ReactElement
 */
export default function ScheduleApp(): React.ReactElement {
  const [{ viewMode }, setViewMode] = useState<{ viewMode: TMode }>({
    viewMode: "job",
  });

  function toggleViewMode() {
    if (viewMode === "user") {
      setViewMode({ viewMode: "job" });
    } else {
      setViewMode({ viewMode: "user" });
    }
  }

  /**
   * Graphql queries.
   */
  let anyLoading = null;
  const {
    loading: jobsLoading,
    error: jobsError,
    data: jobsData,
  }: QueryResult = useQuery(GET_JOBS, {
    onCompleted: (jobsData) => {
      jobsArrayVar(jobsData.getJobs);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on jobsData Query, Schedule.tsx", error);
    },
  });
  if (jobsLoading) {
    anyLoading = jobsLoading;
  }

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  }: QueryResult = useQuery(SCHEDULE_GET_USERS, {
    onCompleted: (usersData) => {
      usersArrayVar(usersData.scheduleGetUsers);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on userData Query, Schedule.tsx", error);
    },
  });
  if (usersLoading) {
    anyLoading = usersLoading;
  }

  const {
    loading: timeEntriesLoading,
    error: timeEntriesError,
    data: timeEntriesData,
  }: QueryResult = useQuery(SCHEDULE_GET_TIME_ENTRIES, {
    onCompleted: (timeEntriesData) => {
      timeEntriesArrayVar(timeEntriesData.scheduleGetTimeEntries);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on timeEntriesData Query, Schedule.tsx", error);
    },
  });
  if (timeEntriesLoading) {
    anyLoading = timeEntriesLoading;
  }
  if (anyLoading) return <CircularProgress />;

  return (
    <>
      <Button
        onClick={() => {
          toggleViewMode();
        }}
      >
        {viewMode}
      </Button>
      <Sidebar viewMode={viewMode} />
      <Schedule viewMode={viewMode} />
    </>
  );
}
