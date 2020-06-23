import React from "react";

export interface ListItemProps {
  label: string;
  value: string | number;
  data: any;
  scheduleSetActiveGroup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  scheduleAssign: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
