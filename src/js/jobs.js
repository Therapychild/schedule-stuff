export const jobs = [
  {
    label: 'Plumber',
    value: 1,
    data: {
      id: 1,
      hoursScheduled: 40,
      hoursPossible: 40,
      warnings: [
      ]
    }
  },
  {
    label: 'Lead Plunger Operator',
    value: 2,
    data: {
      id: 2,
      hoursScheduled: 32,
      hoursPossible: 40,
      warnings: [
        {
          under: "Employee id under-scheduled"
        }
      ]
    }
  }
]
