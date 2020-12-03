import React from "react";
import {
  viewModeVar,
  sidebarStateVar,
  jobsArrayVar,
  usersArrayVar,
  timeEntriesArrayVar,
} from "./util/apolloStore";
import {
  ApolloError,
  QueryResult,
  useQuery,
  useReactiveVar
} from "@apollo/client";
import {
  GET_JOBS,
  SCHEDULE_GET_TIME_ENTRIES,
  SCHEDULE_GET_USERS
} from "./util/clientSchema";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {Sidebar} from "./components/Sidebar";
import {CircularProgress} from "@material-ui/core";
import {Schedule} from "./components/Schedule";

export default function ScheduleApp() {
  const viewMode = useReactiveVar(viewModeVar);


  function toggleViewMode() {
    if (viewModeVar() === "user") {
      viewModeVar("job");
    } else {
      viewModeVar("user");
    }
  }

  /**
   * Graphql queries save data to reactiveVariables.
   */
  let anyLoading = null;
  const {
    loading: jobsLoading,
    error: jobsError,
    data: jobsData
  }: QueryResult = useQuery(GET_JOBS, {
    onCompleted: (jobsData) => {
      jobsArrayVar(jobsData.getJobs);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on jobsData Query, Schedule.tsx", error);
    },
  });
  if (jobsLoading) {
    anyLoading = jobsLoading
  }

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData
  }: QueryResult = useQuery(SCHEDULE_GET_USERS, {
    onCompleted: (usersData) => {
      usersArrayVar(usersData.scheduleGetUsers);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on userData Query, Schedule.tsx", error);
    },
  });
  if (usersLoading) {
    anyLoading = usersLoading
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
    anyLoading = timeEntriesLoading
  }
  if (anyLoading) return <CircularProgress/>;

  console.log("Rendering ScheduleApp.tsx");
  return (
    <>
      <Button onClick={() => {
        sidebarStateVar(!sidebarStateVar());
      }}>
        {<ChevronRightIcon/>}
      </Button>
      <Button onClick={() => {
        toggleViewMode()
      }}>{viewModeVar()}</Button>
      <Sidebar/>
      <Schedule/>
    </>
  )
}
