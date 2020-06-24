import React from "react";

/**
 * Interface for a Group.
 */
export interface ListItemProps {
  label: string;
  value: string | number;
  data: any;
  scheduleSetActiveGroup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  scheduleAssign: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
