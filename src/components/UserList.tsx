import React, { ReactElement } from "react";
import { User, usersArrayVar } from "../util/apolloStore";
import { useReactiveVar } from "@apollo/client";
import List from "@material-ui/core/List";
import { UserListItem } from "./UserListItem";

import "../styles/list.scss";

/**
 * Composes an array of userListItems from the data stored in usersArrayVar.
 *
 * @param:
 *   jobsArrayVar: A Reactive variable used to set or retrieve the current list
 *   of users.
 *
 * @return ReactElement.
 */
export function UserList(): React.ReactElement {
  const users: User[] = useReactiveVar(usersArrayVar);
  let rows: ReactElement[] = [];

  function formatUsers(data: User[]) {
    const listItems: ReactElement[] = [];
    data.forEach((item: User) => {
      listItems.push(
        <UserListItem
          className="user"
          entityId={item.uid}
          primaryText={item.username}
          buttonText="Assign"
          entityType={"user"}
          key={item.uid}
        />
      );
    });

    rows = listItems;
  }

  formatUsers(users);

  return <List className="entity-list">{rows}</List>;
}
