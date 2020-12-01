import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {ActiveIds, setToActiveIdsVar} from "../util/apolloStore";
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_IDS} from "../util/clientSchema";

export interface Props {
  className: string;
  id: string;
  primaryText: string;
  buttonText: string;
  executeSecondary: Function; // AssignToActive
}

type ListItem = {
  className: string;
  id: string;
  primaryText: string;
  buttonText: string;
  executeSecondary: Function;
  key: string;
}

export function AssignableListItem(props: Props): React.ReactElement {
  const {
    className,
    id,
    primaryText,
    buttonText,
    executeSecondary,
  } = props;

  const {data: activeIdsData} = useQuery(GET_ACTIVE_IDS);
  const activeTimeEntryId = activeIdsData.activeIds.timeEntryId;

  const scheduleSetActiveIds = ({timeEntryId, entityId}: ActiveIds) => {
    setToActiveIdsVar({timeEntryId, entityId});
  }

  return (
    <div className="window-list-item">
      <ListItem
        className="list-item"
        alignItems="flex-start"
        button={true}
        onClick={() => {
          scheduleSetActiveIds({timeEntryId: activeTimeEntryId, entityId: id});
        }}
      >
        <ListItemText primary={primaryText}/>
      </ListItem>
      <Button
        className={className}
        onClick={executeSecondary({entityId: id})}>
        {buttonText}
      </Button>
    </div>
  );
}
