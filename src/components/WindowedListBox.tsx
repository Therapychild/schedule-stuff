import React, {useState} from 'react';
import {
  ApolloError,
  QueryResult,
  useQuery,
} from "@apollo/client";
import {ActiveIds} from "../util/apolloStore";
import {
  GET_JOBS,
  SCHEDULE_GET_USERS
} from "../util/clientSchema";
import {TMode} from "../util/types";
import List from "@material-ui/core/List";
import {AssignableListItem} from "./AssignableListItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles/list.scss";

export interface Props {
  viewMode: TMode;
}

// @todo: Set active item with a style to show it is active.
export function WindowedListBox(props: Props) {
  const {viewMode} = props;
  const [{rows}, setRows] = useState({rows: []});

  let loading = null;
  if (viewMode === "user") {
    const {loading: jobsLoading, error: jobsError, data: jobsData}: QueryResult = useQuery(GET_JOBS, {
      onCompleted: (data) => {
        formatListItems(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on jobsData, WindowedListBox", error);
      },
    });
    if (jobsLoading) {
      loading = jobsLoading;
    }
  } else if (viewMode === "job") {
    const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
      onCompleted: (data) => {
        formatListItems(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on userData, WindowedListBox", error);
      },
    });
    if (usersLoading) {
      loading = usersLoading;
    }
  }
  if (loading) return <CircularProgress/>;

  const onAssign = ({entityId}: ActiveIds) => {
    // assignToActive("id");
  }

  function formatListItems(data: any) {
    let listItems: any = [];

    // @todo: Find a way to replace the name value based on viewMode so this can
    // be shortened to a single method.
    // @todo: Set the groups in cache from Schedule and retrieve from there.
    if (viewMode === "user") {
      Object.keys(data.getJobs).forEach((key: string, index: number) => {
        const jobItem = data.getJobs[index];
        listItems.push(
          <AssignableListItem
            className="job"
            id={jobItem.uid}
            primaryText={jobItem.name}
            buttonText="Assign"
            entityType={"job"}
            key={key}
          />
        );
      });
    } else if (viewMode === "job") {
      Object.keys(data.scheduleGetUsers).forEach((key: string, index: number) => {
        const userItem = data.scheduleGetUsers[index];
        listItems.push(
          <AssignableListItem
            className="user"
            id={userItem.uid}
            primaryText={userItem.username}
            buttonText="Assign"
            entityType={"user"}
            key={key}
          />
        );
      });
    }

    setRows({rows: listItems});
  }

  return (
    <List className="window-list">
      {rows}
    </List>
  );
}
