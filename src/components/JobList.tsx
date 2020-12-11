import React, { ReactElement } from "react";
import { Job, jobsArrayVar } from "../util/apolloStore";
import { useReactiveVar } from "@apollo/client";
import List from "@material-ui/core/List";
import { JobListItem } from "./JobListItem";

import "../styles/list.scss";

export interface Props {
  className: string;
}

/**
 * Composes an array of jobListItems from the data stored in jobsArrayVar.
 *
 * @param:
 *   jobsArrayVar: A Reactive variable used to set or retrieve the current list
 *   of jobs.
 *
 * @return React.ReactElement.
 */
export function JobList(props: Props): React.ReactElement {
  const { className } = props;
  const jobs: Job[] = useReactiveVar(jobsArrayVar);
  let rows: ReactElement[] = [];

  function formatJobs(data: Job[]) {
    const listItems: ReactElement[] = [];
    data.forEach((item: Job) => {
      listItems.push(
        <JobListItem
          className="entity-list-item job"
          entityId={item.uid}
          primaryText={item.name}
          buttonText="Assign"
          entityType="job"
          key={item.uid}
        />
      );
    });

    rows = listItems;
  }

  formatJobs(jobs);

  return <List className={className}>{rows}</List>;
}
