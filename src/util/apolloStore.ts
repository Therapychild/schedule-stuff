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
import {TimelineGroupBase, TimelineItemBase} from "react-calendar-timeline";
import {TMode} from "./types";

export interface User {
  type: ["User"];
  uid: string;
  username: string;
  skills: [Skill];
  scheduledTime: number;
  workedTime: number;
}

export interface Job {
  type: ["Job"];
  uid: string;
  skills: Skill[];
  name: string;
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
  type: string[];
  uid: string;
  job: Job;
  user: User;
  startTime: string;
  endTime: string;
  duration: number;
  releaseDate: string;
  dueDate: string;
}

export interface ActiveIds {
  entityId: string | undefined;
  entityName: string | undefined;
  entityType: string | undefined;
  timeEntryId: string | undefined;
}

export interface AssignIds {
  entityId: string | undefined;
  entityName: string | undefined;
  entityType: string | undefined;
  timeEntryId: string | undefined;
}

export interface ViewId {
  timeEntryId: string | undefined;
}

export const cache = new InMemoryCache({
  typePolicies: {
    JobsArray: {
      fields: {
        jobsArray: {
          read() {
            return jobsArrayVar();
          }
        }
      }
    },
    UsersArray: {
      fields: {
        usersArray: {
          read() {
            return usersArrayVar();
          }
        }
      }
    },
    ViewMode: {
      fields: {
        viewMode: {
          read() {
            return viewModeVar();
          }
        }
      }
    },
    ActiveIds: {
      fields: {
        activeIds: {
          read() {
            return activeIdsVar();
          }
        }
      }
    },
    AssignIds: {
      fields: {
        assignIds: {
          read() {
            return assignIdsVar();
          }
        }
      }
    },
    ActiveListItemId: {
      fields: {
        ActiveListItemId: {
          read() {
            return ActiveListItemIdVar();
          }
        }
      }
    },
  }
});

// Create the reactive variables and initialize with initial value.
export const sidebarStateVar = makeVar(false);
export const jobsArrayVar = makeVar<Job[]>([]);
export const usersArrayVar = makeVar<User[]>([]);
export const timeEntriesArrayVar = makeVar<TimeEntry[]>([]);
export const viewModeVar = makeVar<TMode>("job");
export const ActiveListItemIdVar = makeVar<string | undefined>(undefined);
export const activeIdsVar = makeVar<ActiveIds>({
  entityId: undefined,
  entityName: undefined,
  entityType: undefined,
  timeEntryId: undefined,
});
export const assignIdsVar = makeVar<AssignIds>({
  entityId: undefined,
  entityName: undefined,
  entityType: undefined,
  timeEntryId: undefined,
});

const httpLink = createHttpLink({
  uri: "http://192.168.64.2:3000/graphql",
  headers: {"content-type": "application/json"},
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
