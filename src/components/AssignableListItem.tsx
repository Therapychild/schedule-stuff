import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {
  setToActiveIdsVar,
  assignableIdsVar
} from "../util/apolloStore";

export interface Props {
  className: string;
  id: string;
  primaryText: string;
  buttonText: string;
  entityType: string;
  key: string;
}

export function AssignableListItem(props: Props): React.ReactElement {
  const {
    className,
    id,
    primaryText,
    buttonText,
    entityType,
    key
  } = props;

  return (
    <div className="window-list-item">
      <ListItem
        className={`${className}-list-item`}
        alignItems="flex-start"
        button={true}
        onClick={() => {
          setToActiveIdsVar(Object.defineProperty(setToActiveIdsVar(), "entityId", {value: id}));
        }}
      >
        <ListItemText primary={primaryText}/>
      </ListItem>
      <Button
        className={key}
        onClick={() => {
          assignableIdsVar({
            entityId: id,
            entityName: primaryText,
            entityType: entityType,
            timeEntryId: setToActiveIdsVar().timeEntryId
          });
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
}
