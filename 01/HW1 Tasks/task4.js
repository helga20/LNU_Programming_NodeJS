/*
  Task 4
  Create an object to represent a student (name, email, isActive, group, list of courses).
  Initialize array of 5 students.
  Find user by name.
  Find all students that are attending certain course.
*/

const student = {
  name: "",
  email: "",
  isActive: true,
  group: "",
  listOfCourses: [],
};

const students = [
  {
    name: "Olia Kravets",
    email: "oliak2003@gmail.com",
    isActive: true,
    group: "PMO",
    listOfCourses: ["Programming", "Software Engineering", "MO"],
  },
  {
    name: "Nazar Kravets",
    email: "nazarkravets02@gmail.com",
    isActive: false,
    group: "PMO",
    listOfCourses: ["MOK", "Software Engineering"],
  },
  {
    name: "Viktoriia Papizh",
    email: "vikpap2003@gmail.com",
    isActive: false,
    group: "PMI",
    listOfCourses: ["Math", "MKO", "Programming"],
  },
  {
    name: "Olena Pletenia",
    email: "plet2olena@gmail.com",
    isActive: true,
    group: "PMI",
    listOfCourses: ["Math", "Programming"],
  },
  {
    name: "Markiian Hoshko",
    email: "markiianhoshko29@gmail.com",
    isActive: true,
    group: "PMK",
    listOfCourses: ["Programming", "TIMS", "Math"],
  },
];

const findStudentByName = (name) => {
  return students.find((student) => student.name === name);
};

console.log(
  "Find a student by name: \n",
  JSON.stringify(findStudentByName("Olia Kravets"))
);
console.log("Find a student by name: \n", findStudentByName("Olena Pletenia"));

const findStudentsByCourse = (course) => {
  return students.filter((student) => student.listOfCourses.includes(course));
};

console.log("All students who have Math: \n", findStudentsByCourse("Math"));
console.log("All students who have MKO: \n", findStudentsByCourse("MKO"));
