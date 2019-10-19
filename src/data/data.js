const departments = [
  "Administration",
  "Engineering",
  "Human Resources",
  "Networking"
];

const trainingEvents = [
  {
    name: "Office training",
    description: "Test",
    department: "Administration",
    duration: 0.5,
    datetime: new Date(),
    meetingroom: 101
  },
  {
    name: "Dev training",
    description: "Test",
    department: "Engineering",
    duration: 1,
    datetime: new Date(),
    meetingroom: 102
  },
  {
    name: "Payroll training",
    description: "Payroll training",
    department: "Human Resources",
    duration: 1.5,
    datetime: new Date(),
    meetingroom: 103
  },
  {
    name: "Security training",
    description: "Security training",
    department: "Networking",
    duration: 2,
    datetime: new Date(),
    meetingroom: 104
  },
  {
    name: "Admin training",
    description: "Test",
    department: "Administration",
    duration: 2.5,
    datetime: new Date(),
    meetingroom: 105
  },
  {
    name: "QA training",
    description: "Test",
    department: "Engineering",
    duration: 1,
    datetime: new Date(),
    meetingroom: 106
  }
];

export { departments, trainingEvents };
