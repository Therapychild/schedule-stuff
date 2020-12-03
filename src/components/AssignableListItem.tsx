import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {
  activeIdsVar,
  assignIdsVar
} from "../util/apolloStore";
import {useReactiveVar} from "@apollo/client";

export interface Props {
  className: string;
  id: string;
  primaryText: string;
  buttonText: string;
  entityType: string;
}

export function AssignableListItem(props: Props): React.ReactElement {
  const {
    className,
    id,
    primaryText,
    buttonText,
    entityType,
  } = props;
  const assignIds = useReactiveVar(assignIdsVar);
  const activeIds = useReactiveVar(activeIdsVar);

  const activeColor = activeIds.entityId === id ? {backgroundColor: "yellow"} : undefined;

  console.log("Rendering AssignableListItem.tsx");
  return (
    <div className="entity-list-item" style={activeColor}>
      <ListItem
        className={`${className}-list-item`}
        alignItems="flex-start"
        button={true}
        onClick={() => {

          activeIdsVar({
            entityId: id,
            entityName: primaryText,
            entityType: entityType,
            timeEntryId: activeIdsVar().timeEntryId
          });
          console.log("SetActive, ListItem", activeIdsVar());
        }}
      >
        <ListItemText primary={primaryText}/>
      </ListItem>
      <Button
        className="assign"
        onClick={() => {
          assignIdsVar({
            entityId: id,
            entityName: primaryText,
            entityType: entityType,
            timeEntryId: activeIdsVar().timeEntryId
          });
          console.log("Assignable ListItem", assignIdsVar());
        }}
        disabled={activeIdsVar().timeEntryId === undefined}
      >
        {buttonText}
      </Button>
    </div>
  );
}
