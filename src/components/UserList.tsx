import React from 'react';
import {useReactiveVar} from "@apollo/client";
import {
  User,
  usersArrayVar,
} from "../util/apolloStore";
import List from "@material-ui/core/List";
import {UserListItem} from "./UserListItem";

import "../styles/list.scss";

// @todo: Set active item with a style to show it is active.
export function UserList() {
  const users: User[] = useReactiveVar(usersArrayVar);
  let rows: any[] = [];

  function formatUsers(data: User[]) {
    let listItems: any[] = [];
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

  console.log("Rendering UserList.tsx");
  return (
    <List className="entity-list">
      {rows}
    </List>
  );
}
