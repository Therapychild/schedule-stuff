import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScheduleApp from "./ScheduleApp";

const client = new ApolloClient({
  uri:
    window.location.protocol +
    "//" +
    window.location.host +
    "/graphql/time-entry/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <CssBaseline />
      <ScheduleApp />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)
