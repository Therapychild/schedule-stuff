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
  key: string;
}

export function AssignableListItem(props: Props): React.ReactElement {
  const {
    className,
    id,
    primaryText,
    buttonText,
    executePrimary,
    executeSecondary,
    key,
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
        key={key}
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
