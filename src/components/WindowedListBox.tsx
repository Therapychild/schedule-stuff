import React, {useState} from 'react';
import {AssignableListItem} from "./AssignableListItem";
import List from "@material-ui/core/List";
import {ApolloError, makeVar, QueryResult, useQuery} from "@apollo/client";
import {GET_JOBS, SCHEDULE_GET_USERS} from "../util/clientSchema";
import {TMode} from "../types/types";

import "../styles/list.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface Props {
  viewMode: TMode;
}

export function WindowedListBox(props: Props) {
  const {viewMode} = props;
  const [rows, setRows] = useState([]);
  // @todo: Set active item with a style to show it is active.
  const [activeId, setActiveId] = useState();
  const assignToActive = makeVar("User_1_name");
  // get active item id

  let loading = null;
  if (viewMode === "user") {
    const {loading: jobsLoading, error: jobsError, data: jobsData}: QueryResult = useQuery(GET_JOBS, {
      onCompleted: (data) => {
        formatListItems(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on jobsData", error);
      },
    });
    if (jobsLoading) {
      loading = jobsLoading
    }
  } else if (viewMode === "job") {
    const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
      onCompleted: (data) => {
        formatListItems(data);
      },
      onError: (error: ApolloError) => {
        console.log("ERROR on userData", error);
      },
    });
    if (usersLoading) {
      loading = usersLoading
    }
  }
  if (loading) return <CircularProgress/>;

  const onSetActive = (id: any) => {
    setActiveId(id);
  }

  const onAssign = (id: string | number) => {
    assignToActive("id");
  }

  function formatListItems(data: any) {
    let listItems: any = [];

    // @todo: Find a way to replace the name value based on viewMode so this can
    // be shortened to a single method.
    if (viewMode === "user") {
      Object.keys(data.getJobs).forEach((key: string, index: number) => {
        const jobItem = data.getJobs[index];
        listItems.push(
          <AssignableListItem
            className={"job"}
            id={jobItem.uid}
            primaryText={jobItem.name}
            buttonText={"Assign"}
            executePrimary={onSetActive}
            executeSecondary={onAssign}
            key={key}
          />
        );
      });
    } else if (viewMode === "job") {
      Object.keys(data.scheduleGetUsers).forEach((key: string, index: number) => {
        const userItem = data.scheduleGetUsers[index];
        listItems.push(
          <AssignableListItem
            className={"user"}
            id={userItem.uid}
            primaryText={userItem.username}
            buttonText={"Assign"}
            executePrimary={onSetActive}
            executeSecondary={onAssign}
            key={key}
          />
        );
      });
    }

    setRows(listItems);
  }

  return (
    <List className="window-list">
      {rows}
    </List>
  );
}
