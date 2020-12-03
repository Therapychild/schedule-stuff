import React from 'react';
import {useReactiveVar} from "@apollo/client";
import {
  assignIdsVar,
  Job,
  jobsArrayVar,
} from "../util/apolloStore";
import List from "@material-ui/core/List";
import {JobListItem} from "./JobListItem";

import "../styles/list.scss";

// @todo: Set active item with a style to show it is active.
export function JobList() {
  const jobs: Job[] = useReactiveVar(jobsArrayVar);
  let rows: any[] = [];

  function formatJobs(data: Job[]) {
    let listItems: any[] = [];
    data.forEach((item: Job) => {
      listItems.push(
        <JobListItem
          className="job"
          entityId={item.uid}
          primaryText={item.name}
          buttonText="Assign"
          entityType={"job"}
          key={item.uid}
        />
      );
    });

    rows = listItems;
  }

  formatJobs(jobs);

  console.log("Rendering JobList.tsx");
  return (
    <List className="entity-list">
      {rows}
    </List>
  );
}
