import React, { CSSProperties, useState } from "react";
import { Card as TimeEntryCard } from "time-entry/dist/components/Card";
import Button from "@material-ui/core/Button";

export interface Props {
  setActiveButton?: JSX.Element;
  active?: CSSProperties;
  assignEntity: () => {};
  timeEntry: any;
  disabled: boolean;
}

/**
 * Composes an "Assign" button, as well as a "More Info" button to display a
 * TimeEntryCard which consists of the timeEntry's information.
 *
 * @param:
 *   props:
 *     setActiveButton: A button that sets the TimeLineItem's id to active, and
 *       also sets its assigned entityId to active if one exists;
 *     active?: A style applied when the TimeLineItem's id becomes active;
 *     assignEntity: A callback function that assigns the active entityId to the
 *       active TimelineItem's Id;
 *     infoData: Data to display in the TimeEntryCard;
 *     disabled: A boolean that renders the "Assign" button inactive if there is
 *       not an active entityId.
 *
 * @return React.ReactElement
 */
export function TimeLineItem(props: Props): React.ReactElement {
  const { setActiveButton, active, assignEntity, timeEntry, disabled } = props;
  const [scheduleViewTimeEntryId, setScheduleViewTimeEntryId] = useState(
    undefined
  );

  const viewTimeEntryCard =
    scheduleViewTimeEntryId === timeEntry.uid ? (
      <TimeEntryCard className="" data={timeEntry} />
    ) : (
      <></>
    );

  return (
    <div id={timeEntry.uid} className="time-line-item">
      {setActiveButton}
      <Button
        className="assign"
        onClick={async () => {
          assignEntity();
        }}
        disabled={disabled}
      >
        Assign
      </Button>
      <Button
        className="more-info"
        style={active}
        onClick={() => {
          scheduleViewTimeEntryId === timeEntry.uid
            ? setScheduleViewTimeEntryId(undefined)
            : setScheduleViewTimeEntryId(timeEntry.uid);
        }}
      >
        Info
      </Button>
      {viewTimeEntryCard}
    </div>
  );
}
