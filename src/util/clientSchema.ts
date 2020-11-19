import {gql} from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs($skillIds: [String]) {
    getJobs(skillIds: $skillIds) {
      type
      uid
      name
      skills {
        uid
        name
      }
      releaseDate
      dueDate
      estimatedTime
      scheduledTime
      workedTime
    }
  }
`;

export const GET_SKILLS = gql`
  query GetSkills {
    getSkills {
      type
      uid
      name
    }
  }
`;

export const SCHEDULE_GET_USERS = gql`
  query scheduleGetUsers($startTime: String, $endTime: String, $skillIds: [String], $username: String) {
    scheduleGetUsers(startTime: $startTime, endTime: $endTime, skillIds: $skillIds, username: $username) {
      type
      uid
      username
      skills {
        uid
        name
      }
      scheduledTime
      workedTime
    }
  }
`;

export const SCHEDULE_GET_TIME_ENTRIES = gql`
  query scheduleGetTimeEntries($startTime: String, $endTime: String, $userIds: [String], $jobIds: [String]) {
    scheduleGetTimeEntries(startTime: $startTime, endTime: $endTime, userIds: $userIds, jobIds: $jobIds) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;

export const NEW_TIME_ENTRY_JOB = gql`
  mutation NewTimeEntryForJob($startTime: String!, $endTime: String!, $jobId: String!) {
    newTimeEntryForJob(startTime: $startTime, endTime: $endTime, jobId: $jobId) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;

export const NEW_TIME_ENTRY_USER = gql`
  mutation NewTimeEntryForUser($startTime: String!, $endTime: String!, $userId: String!) {
    newTimeEntryForUser(startTime: $startTime, endTime: $endTime, userId: $userId) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;

export const MOVE_TIME_ENTRY = gql`
  mutation MoveTimeEntry($startTime: String!, $endTime: String!, $timeEntryId: String!) {
    moveTimeEntry(startTime: $startTime, endTime: $endTime, timeEntryId: $timeEntryId) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;

export const SET_USER = gql`
  mutation SetUser($userId: String!, $timeEntryId: String!) {
    setUser(userId: $userId, timeEntryId: $timeEntryId) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;

export const SET_JOB = gql`
  mutation SetJob($jobId: String!, $timeEntryId: String!) {
    setJob(jobId: $jobId, timeEntryId: $timeEntryId) {
      type
      uid
      job {
        uid
        name
        skills {
          uid
          name
        }
        releaseDate
        dueDate
        estimatedTime
        scheduledTime
        workedTime
      }
      user {
        uid
        username
        skills {
          uid
          name
        }
        scheduledTime
        workedTime
      }
      startTime
      endTime
      duration
      releaseDate
      dueDate
    }
  }
`;
