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

export interface Entity {
  type: string[];
  status: string;
  uid: string;
}

export interface User extends Entity {
  type: ["User"];
  username: string;
  skills: Skill[];
  scheduledTime: number;
  workedTime: number;
}

export interface Job extends Entity {
  type: ["Job"];
  name: string;
  skills: Skill[];
  releaseDate: string;
  dueDate: string;
  estimatedTime: number;
  scheduledTime: number;
  workedTime: number;
}

export interface Skill extends Entity {
  type: ["Skill"];
  name: string;
}

export interface TimeEntry extends Entity {
  job: Job;
  user: User;
  startTime: string;
  endTime: string;
  duration: number;
  releaseDate: string;
  dueDate: string;
}

export interface ActiveIds {
  entityId?: string;
  entityName?: string;
  entityType?: string;
  timeEntryId?: string;
}

export interface AssignIds {
  entityId?: string;
  entityName?: string;
  entityType?: string;
  timeEntryId?: string;
}

export const cache = new InMemoryCache({
  typePolicies: {
    JobsArray: {
      fields: {
        jobsArray: {
          read() {
            return jobsArrayVar();
          },
        },
      },
    },
    UsersArray: {
      fields: {
        usersArray: {
          read() {
            return usersArrayVar();
          },
        },
      },
    },
    ActiveIds: {
      fields: {
        activeIds: {
          read() {
            return activeIdsVar();
          },
        },
      },
    },
    AssignIds: {
      fields: {
        assignIds: {
          read() {
            return assignIdsVar();
          },
        },
      },
    },
  },
});

// Create the reactive variables and initialize with value.
export const jobsArrayVar = makeVar<Job[]>([]);
export const usersArrayVar = makeVar<User[]>([]);
export const timeEntriesArrayVar = makeVar<TimeEntry[]>([]);
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
  headers: { "content-type": "application/json" },
});
const myLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation).map((data) => {
    return data;
  });
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([myLink, httpLink]),
});
