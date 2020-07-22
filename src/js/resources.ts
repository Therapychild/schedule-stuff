import Resource from "duckies/dist/resource/Resource";
var seedrandom = require('seedrandom');

export const userNames: string[] = [
  "Luis Alvarez",
  "Andre-Marie Ampere",
  "Mary Anning",
  "Amedeo Avogadro",
  "Francis Bacon",
  "Alexander Graham Bell",
  "Daniel Bernoulli",
  "Elizabeth Blackwell",
  "Niels Bohr",
  "Robert Boyle",
  "Tycho Brahe",
  "Robert Bunsen",
  "Rachel Carson",
  "Santiago Ramon y Cajal",
  "George Washington Carver",
  "James Chadwick",
  "Subrahmayan Chandrasekhar",
  "Erwin Chargaff",
  "Nicolaus Copernicus",
  "Jacques Costeau",
  "Marie Curie",
  "John Dalton",
  "Charles Darwin",
  "Rene Descartes",
  "Frank Drake",
  "Albert Einstein",
  "Leonhard Euler",
  "Michael Faraday",
  "Pierre de Fermat",
  "Ronald Fisher",
  "Alexander Fleming",
  "Benjamin Franklin",
  "Rosalind Franklin",
  "Galileo Galilei",
  "Cecilia Payne-Gaposchikin",
  "Carl Friedrich Gauss",
  "Sophie Germain",
  "Willard Gibbs",
  "Jane Goodall",
  "William Harvey",
  "Caroline Hershel",
  "Heinrich Hertz",
  "David Hilbert",
  "Robert Hooke",
  "Grace Hopper",
  "Jack Horner",
  "Edwin Hubble",
  "James Hutton",
  "Irene Joliot-Curie",
  "Johannes Kepler",
  "Omar Khayyam",
  "Stephanie Kwolek",
  "Karl Landsteiner",
  "Antoine Lavosier",
  "Henrietta Leavitt",
  "Antonie van Leeuwenhoek",
  "Carolus Linnaeus",
  "Ada Lovelace",
  "James Clerk Maxwell",
  "Barbara McClintock",
  "Lise Meitner",
  "Gregor Mendel",
  "Dmitri Mendeleev",
  "Henry Moseley",
  "Isaac Newton",
  "Florence Nightingale",
  "Alfred Nobel",
  "Emmy Noether",
  "Hans Christian Oersted",
  "Louis Pasteur",
  "Linus Pauling",
  "Max Planck",
  "Claudius Ptolemy",
  "C. V. Raman",
  "Srinivasa Ramanujan",
  "Francesco Redi",
  "Ernest Ruthorford",
  "Theodor Schwann",
  "Gene Shoemaker",
  "B. F. Skinner",
  "J. J. Thomson",
  "Andreas Vesalius",
  "Rudolf Virchow",
  "Alessandro Volta",
  "Alfred R. Wallace",
  "James Watt",
  "Alfred Wegener",
  "Chen-Ning Yang",
];

export const jobNames: {[index: string]: any} = {
  basicJob: {
    id: "basicJob",
    name: "Cookie Baking",
    parent: null,
    requirements: [],
  },
  hierarchical: {
    id: "hierarchical",
    name: "Street Maintenance",
    parent: null,
    requirements: [],
  },
  childJob1: {
    id: "childJob1",
    name: "Lantern Lighting",
    parent: "hierarchical",
    requirements: []
  },
  childJob2: {
    id: "childJob2",
    name: "Street Sweeping",
    parent: "hierarchical",
    requirements: []
  },
  hasRequirements: {
    id: "hasRequirements",
    name: "Rocket Development",
    parent: null,
    requirements: ["pointyEndUp"]
  }
}

export const skills = {
  pointyEndUp: {
    id: "pointyEndUp",
    name: "Rocket Science"
  }
}

/**
 * Pretend that the higher decimal places of sin are random.
 * @param seed
 */
function badRandom(seed: number): number {
  const value = seedrandom(seed as unknown as string).double();
  return value;
}

/**
 * ********** USERS ***********
 * @param id
 */
export interface User {
  id: number
  name: string,
  skills: string[],
}

export function getUser(id: number): User {
  if (id >= userNames.length) {
    throw new Error(`Max user id is ${userNames.length - 1}, given: ${id}`);
  }

  const userSkills = [];

  // Give 1 in 5 users the rocket science skill.
  if (badRandom(id) > 0.8) {
    userSkills.push("pointyEndUp");
  }

  return {
    id,
    name: userNames[id],
    skills: userSkills
  }
}

export function getAllUsers(): {[index: string]: User} {
  const users: {[index: string]: User} = {};
  userNames.forEach((name: string, id: number) => {
    users[id] = getUser(id);
  });
  return users;
}

export function getUserResources(): {[index: string]: Resource} {
  const users = getAllUsers();

  const resources: {[index: string]: Resource} = {};

  Object.keys(users).forEach((userId: string)  => {
    resources[userId] = new Resource(
      {
        id: userId,
        type: "user",
        attributes: users[userId]
      },
      () => {}
    )
  })

  return resources;
}

/**
 * ********** Jobs ***********
 * @param id
 */
export interface Job {
  id: string,
  name: string,
  requirements: string[]
}

export function getJob(id: string): Job {
  if (id >= jobNames.length) {
    throw new Error(`Max user id is ${jobNames.length - 1}, given: ${id}`);
  }

  const requirements = [];

  // Give 1 in 5 users the rocket science skill.
  if (badRandom(parseInt(id)) > 0.8) {
    requirements.push("pointyEndUp");
  }

  return {
    id,
    name: jobNames[id],
    requirements: requirements
  }
}

export function getAllJobs(): {[index: string]: Job} {
  const jobs: {[index: string]: Job} = {};
  Object.keys(jobNames).forEach((index: string) => {
    jobs[index] = getJob(index);
  });
  return jobs;
}

export function getJobResources(): {[index: string]: Resource} {
  const jobs = getAllJobs();

  const resources: {[index: string]: Resource} = {};

  Object.keys(jobs).forEach((jobId: string)  => {
    resources[jobId] = new Resource(
      {
        id: jobId,
        type: "job",
        attributes: jobs[jobId]
      },
      () => {}
    )
  })

  return resources;
}

/**
 * ********** Time Entries ***********
 * @param id
 */
export interface TimeEntry {
  id: string
  user?: number
  job?: string
  start: number,
  end: number,
}

// start and end are dates.
export function getTimeEntries(start: number, end: number): {[index: string]: Resource} {
  const jobSeeds: {[index: string]: number} = {
    basicJob: 1,
    hierarchical: 2,
    childJob1: 3,
    childJob2: 4,
    hasRequirements: 5,
    undefined: 6
  }
  const timeEntries: {[index: string]: Resource} = {};
  const occupied: {[index: number]: [number, number][]} = {};

  for (let current = start - start % 900; current < end; current += 900) {
    Object.keys(jobSeeds).forEach((jobId: string): void => {
      let numberOfTimeEntries = Math.floor(badRandom(jobSeeds[jobId] * current) * 6) - 3;
      while (numberOfTimeEntries > 0) {
        numberOfTimeEntries--;
        // Derive a time entry id.
        const timeEntryId = `${jobId}${current}-${numberOfTimeEntries}`;

        // Derive a user id.
        // console.log({current, jobSeed: jobSeeds[jobId], numberOfTimeEntries});
        let userId: number = Math.floor(badRandom(current + jobSeeds[jobId] + numberOfTimeEntries) * userNames.length * 3);
        // console.log(badRandom(current + jobSeeds[jobId] + numberOfTimeEntries));
        if (userId >= userNames.length) {
          userId = -1;
        }

        if (!(userId in occupied)) {
          occupied[userId] = [];
        }

        // Derive an end time.
        let end = Math.floor(badRandom(current + jobSeeds[jobId] + numberOfTimeEntries + 0.3) * 32) * 900 + current;

        // Don't save the time entry if the user is already scheduled in this
        // period.
        if (userId !== -1) {
          for (let alreadyScheduled of occupied[userId]) {
            if (current > alreadyScheduled[0] && current < alreadyScheduled[1]) {
              return;
            }
            if (end > alreadyScheduled[0] && end < alreadyScheduled[1]) {
              return;
            }
          }
        }

        occupied[userId].push([current, end]);

        timeEntries[timeEntryId] = new Resource({
            id: timeEntryId,
            type: "timeEntry",
            attributes: {
              id: timeEntryId,
              type: "timeEntry",
              job: jobNames[jobId],
              user: userId === -1 ? undefined : getUser(userId),
              start: current,
              end,
            }
          },
          () => {}
        );
      }
    })
  }

  return timeEntries;
}