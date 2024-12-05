// Function to add a new object to the list
function addFailedSubjectToList(list:any, parentSubject:any , newSubjectColumn : any) {
  // Find the largest id in the list
  const largestId = list.reduce((maxId:any, obj:any) => Math.max(maxId, obj.id), 0);
  
  // Create a new object with id + 1 from the largest
  const newObject = { 
    ...parentSubject,
    id: largestId + 1, 
    column: newSubjectColumn, 
    status: "Future",
    message: "2nd Take",
  };
  console.log(largestId, newObject)
  // Add the new object to the list
  return newObject;
}

function generateSequences(numbers:any, max:any) {
  const sequences = []; // To store the sequences
  const maxLimit = max * 3; // Calculate the limit for the sequences

  numbers.forEach((num) => {
    const sequence = []; // Store the sequence for the current number
    let n = 0; // Start from n = 0

    while (true) {
      const value = 3 * n + num; // Compute the sequence: 3n + offset
      if (value > maxLimit) break; // Stop if the value exceeds the limit
      sequence.push(value); // Add the value to the sequence
      n++; // Increment n
    }

    sequences.push(sequence); // Add the current sequence to the result
  });
  // Flatten and sort the sequences
  return sequences.flat().sort((a, b) => a - b);
}

function moveCourseToNextAvailability(availability:any, initialColumn:any) {
  // Find the first number in the array greater than the input
  for (let num of availability) {
    if (num > initialColumn) {
      return num;
    }
  }
  // Return null if no greater number exists
  return initialColumn;
}

export function updateColumnsByFailedSubjects(courses: any) {
  // console.log("BEFORE", courses)
  // console.log("\nAFTER",)
  let newCoursesList: any = [];
  courses.forEach((course: any) => {
    if (course.status == "Failed") {
      const availability = generateSequences(course.availability, 7);
      const newCourseColumn = moveCourseToNextAvailability(
        availability,
        course.column
      );
      newCoursesList.push(course);
      newCoursesList.push(addFailedSubjectToList(newCoursesList, course, newCourseColumn));
    } else {
      newCoursesList.push(course);
    }
  });
  return newCoursesList;
}

export function updateColumnsByConflictingPreRequisite(courses: any) {
  console.log("BEFORE", courses);
  console.log("\nAFTER");
  return courses.map((course: any) => {
    if (course.errorPrerequisite) {
      const availability = generateSequences(course.availability, 7);
      const newCourseColumn = moveCourseToNextAvailability(
        availability,
        course.column
      );
      return { ...course, column: newCourseColumn };
    } else {
      return course;
    }
  });
}

export function updateColumnsByConflictingCoRequisite(subjects: any) {
  const updatedSubjects = [...subjects]; // Create a copy of the subjects array
  const processedSubjects = new Set(); // Track processed subjects to avoid duplication

  for (const subject of updatedSubjects) {
    if (processedSubjects.has(subject.courseCode)) {
      continue; // Skip subjects that are already processed
    }

    const coRequisites = subject.coRequisite || [];
    if (coRequisites.length === 0) {
      continue; // Skip if there are no co-requisites
    }

    // Collect all co-requisite columns including the subject's column
    const coRequisiteColumns = [subject.column];
    const coRequisiteSubjects = [subject]; // Group of co-requisite subjects

    for (const coReqCode of coRequisites) {
      const coReqSubject = updatedSubjects.find(
        (s) => s.courseCode === coReqCode
      );
      if (coReqSubject) {
        coRequisiteColumns.push(coReqSubject.column);
        coRequisiteSubjects.push(coReqSubject);
      }
    }

    // Determine the earliest column
    const minColumn = Math.max(...coRequisiteColumns);

    // Update the column for the subject and its co-requisites
    for (const coReqSubject of coRequisiteSubjects) {
      coReqSubject.column = minColumn;
      processedSubjects.add(coReqSubject.courseCode);
    }
  }

  return updatedSubjects;
}
// Example usage
const numbers = [0, 1, 2]; // Offsets for the sequences
const max = 7; // Max value

// const courses = [
//     {
//         courseDescription: "Computer Programming I",
//         id: "4",
//         column: 0,
//         availability: [0],
//         units: 3,
//         courseCode: "CMSC 18",
//         status: "Passed",
//         error: "asjdfklasdf",
//         preRequisite: [],
//         coRequisite: [],
//     },
//     {
//         courseDescription: "Discrete Mathematical Structures in Computer Science I",
//         id: "5",
//         column: 4,
//         availability: [1],
//         units: 3,
//         courseCode: "CMSC 56",
//         status: "Failed",
//         preRequisite: [],
//         coRequisite: [],
//     },
//     {
//         courseDescription: "Foundations of Physical Fitness",
//         id: "6",
//         column: 5,
//         availability: [2],
//         units: 3,
//         courseCode: "PE 1",
//         status: "Passed",
//         preRequisite: [],
//         coRequisite: [],
//     },
//     {
//         courseDescription:
//             "CWTS DHK - National Service Training Program-Civic Welfare Training Service 1",
//         id: "7",
//         column: 3,
//         availability: [1, 2],
//         units: 3,
//         courseCode: "NSTP 1",
//         status: "Passed",
//         preRequisite: [],
//         coRequisite: [],
//     },
// ];

// console.log(updateColumnsByFailedSubjects(courses))
// console.log(updateColumnsByConflictingPreRequisite(courses))
