import Resource from "duckies/dist/resource/Resource";

/**
 * Interface for a ListItem.
 */
export interface ListItemProps {
  label: string;
  value: string | number;
  resource: Resource;
}
