import Resource from "duckies/dist/resource/Resource";

/**
 * Interface for a User/JobListItem.
 */
export interface ListItemProps {
  label: string;
  value: string | number;
  resource: Resource;
}
