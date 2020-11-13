import React from "react";
import {
  useApolloClient,
  makeVar
} from "@apollo/client";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from "@material-ui/core/Button";

export interface Props {
  id: string | number;
  primaryText: string;
  buttonText: string;
  execute: Function;
}

export function JobListItem(props: Props): React.ReactElement {
  const client = useApolloClient();
  const {id, primaryText, buttonText, execute} = props;

  return (
    <>
      <ListItemText primary={primaryText}/>
      <ListItemSecondaryAction>
        <Button onClick={execute(id)}>
          {buttonText}
        </Button>
      </ListItemSecondaryAction>
    </>
  );
}
