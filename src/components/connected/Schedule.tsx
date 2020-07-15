// import QueryInterface from "duckies/dist/interfaces/QueryInterface";
// import { DefaultQueryAction } from "duckies/dist/action_managers/resource/DefaultQuery";
// import Channelizer from "duckies/dist/utility/channelizer";
import { connect } from "react-redux";
// import moment, {Moment} from "moment";
// import compact from "lodash/compact";

import {
  Schedule,
  StateProps,
  // DispatchProps
} from "../Schedule";

// Get claims via defaultQuery
const mapStateToProps = (state: any): StateProps => {
  // const channelizer: Channelizer = state.services.channelizer;
  // const claims: string[] = state.claims["schedule"];
  const viewMode = state.viewMode;
  // let resources: any[] = [];
  // let timeEntries: any[] = [];
  // let defaultTimeStart: Moment = moment();
  // let defaultTimeEnd: Moment = moment();

  // if (
    // !claims ||
    // claims.length === 0 ||
    // !(viewMode in state.resources)) {

    // return {
      // channelizer,
      // resources: [],
      // timeEntries: [],
      // viewMode: state.viewMode,
      // defaultTimeStart: moment(),
      // defaultTimeEnd: moment()
    // };
  //   return {
  //     viewMode: state.viewMode
  //   }
  // }

  // @todo Get the defaultStart and defaultEnd from the query
  // @ Make a helper function that returns claimed documents
  // Process group claims depending on job or user
  // if (claims) {
  //   resources = claims.map(item => {
  //     return state.resources[viewMode][item]
  //   })
  //
  //   resources = compact(resources);
  //
  //   timeEntries = claims.map(item => {
  //     return state.resources.timeEntry[item]
  //   })
  //
  //   timeEntries = compact(timeEntries);
  // }

  return {
    // channelizer,
    // resources,
    // timeEntries,
    viewMode,
    // defaultTimeStart,
    // defaultTimeEnd
  };
};

// const mapDispatchToProps = (dispatch: Function): DispatchProps => {
//   return {
//     defaultQuery: (query: QueryInterface, channelizer: Channelizer): void => {
//       channelizer.connect("COLLECTION_REQUEST", query.queryId);
//       dispatch({
//         type: "DEFAULT_QUERY",
//         payload: query,
//         meta: {
//           mode: "default"
//         }
//       } as DefaultQueryAction);
//     }
//   };
// };

export const ConnectedSchedule = connect<StateProps, null>(
  mapStateToProps,
  // mapDispatchToProps
)(Schedule);
