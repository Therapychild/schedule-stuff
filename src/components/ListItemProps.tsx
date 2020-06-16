import React from "react";

export interface ListItemProps {
  label: string;
  value: string | number;
  data: any;
  assignActive: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
