import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink, ApolloLink, Operation, NextLink
} from "@apollo/client";

export interface User {
  uid: string,
  username: string,
  skills: [Skill],
  scheduledTime: number,
  workedTime: number,
}

export interface Job {
  uid: string;
  name: string;
  skills: Skill[];
  releaseDate: string;
  dueDate: string;
  estimatedTime: number;
  scheduledTime: number;
  workedTime: number;
}

export interface Skill {
  uid: string;
  name: string;
}

export interface TimeEntry {
  uid: string,
  job: Job,
  user: User,
  startTime: string,
  endTime: string,
  duration: number,
  releaseDate: string,
  dueDate: string,
}

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://192.168.64.2:3000/graphql",
  headers: {"content-type": "application/json"}
});
const myLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation).map((data) => {
    return data;
  })
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([myLink, httpLink]),
});
