import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./util/apolloStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScheduleApp from "./ScheduleApp";

ReactDOM.render(
  <ApolloProvider client={client}>
    {/*<React.StrictMode>*/}
      <CssBaseline />
      <ScheduleApp />
    {/*</React.StrictMode>*/}
  </ApolloProvider>,
  document.getElementById("root")
)
