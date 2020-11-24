import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  ApolloLink,
  Operation,
  NextLink,
  makeVar,
} from "@apollo/client";

export interface User {
  type: string[];
  uid: string;
  username: string;
  skills: [Skill];
  scheduledTime: number;
  workedTime: number;
}

export interface Job {
  type: string[];
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
  type: string[];
  uid: string;
  name: string;
}

export interface TimeEntry {
  type: string[],
  uid: string,
  job: Job,
  user: User,
  startTime: string,
  endTime: string,
  duration: number,
  releaseDate: string,
  dueDate: string,
}

export interface ActiveIds {
  timeEntryId?: string;
  entityId?: string;
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        activeIds: {
          read () {
            return setToActiveVar();
          }
        }
      }
    }
  }
});

// Create the reactive variables and initialize with initial value.
const activeIdsInitialValues: ActiveIds = {timeEntryId: "NotSet", entityId: "NotSet"};
export const setToActiveVar = makeVar<ActiveIds>(activeIdsInitialValues);

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
