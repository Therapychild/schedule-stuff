import {gql} from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs($skillIds: [String]) {
    getJobs(skillIds: $skillIds) {
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
      uid
      name
    }
  }
`;

export const SCHEDULE_GET_USERS = gql`
  query scheduleGetUsers($startTime: String, $endTime: String, $skillIds: [String], $userName: String) {
    scheduleGetUsers(startTime: $startTime, endTime: $endTime, skillIds: $skillIds, userName: $userName) {
      uid
      userName
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
        userName
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
        userName
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
        userName
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
        userName
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
        userName
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
        userName
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
