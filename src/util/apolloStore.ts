import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink, ApolloLink, Operation, NextLink
} from "@apollo/client";

export interface User {
  id: string;
  userName: string;
  skills: Skill[];
  hoursScheduled: number;
  hoursWorked: number;
}

export interface Job {
  id: String;
  name: String;
  skills: Skill[];
  releaseDate: string;
  dueDate: string;
  estimatedHours: number;
  scheduledHours: number;
  workedHours: number;
}

export interface Skill {
  id: string;
  name: string;
}

export interface timeEntry {
  id: string;
  job: Job;
  user: User;
  startTime: string;
  duration: number;
  releaseDate: string;
  dueDate: string;
}

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://192.168.64.2:3000/graphql",
  headers: {"content-type": "application/json"}
});
const myLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation).map((data) => {
    console.log(data);
    return data;
  })
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([myLink, httpLink]),
});

