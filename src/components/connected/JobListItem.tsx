import {
  scheduleAssign,
  ScheduleAssignAction
} from "../../action_managers/resource/ScheduleAssign";
//
// import {
//   JobListItem,
//   DispatchProps,
// } from "../JobListItem";
//
// import Resource from "duckies/dist/resource/Resource";
// import {connect} from "react-redux";
//
// const mapDispatchToProps = (dispatch: Function): DispatchProps => {
//   return {
//     scheduleAssign: (resource?: Resource, timeEntry?: Resource): void => {
//       dispatch({
//         type: scheduleAssign,
//         payload: { resource, timeEntry },
//       } as ScheduleAssignAction);
//     },
//     scheduleSetActiveResource: (timeEntry: string): void => {
//       dispatch({
//         type: "KEY_VALUE",
//         payload: {
//           key: "scheduleSetActiveResource",
//           value: timeEntry
//         },
//       } as KeyValueAction);
//     },
//   };
// };
//
// export const ConnectedJobListItem = connect<{}, DispatchProps>(
//   null,
//   mapDispatchToProps
// )(JobListItem);
