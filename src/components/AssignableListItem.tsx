import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

export interface Props {
  className: string;
  id: string | number;
  primaryText: string;
  buttonText: string;
  executePrimary: Function;
  executeSecondary: Function;
}

export function AssignableListItem(props: Props): React.ReactElement {
  const {
    className,
    id,
    primaryText,
    buttonText,
    executePrimary,
    executeSecondary,
  } = props;

  return (
    <div className="window-list-item">
      <ListItem
        className="list-item"
        alignItems="flex-start"
        button={true}
        onClick={() => {
          executePrimary(id);
        }}
      >
        <ListItemText primary={primaryText}/>
      </ListItem>
      <Button
        className={className}
        onClick={executeSecondary(id)}>
        {buttonText}
      </Button>
    </div>
  );
}
