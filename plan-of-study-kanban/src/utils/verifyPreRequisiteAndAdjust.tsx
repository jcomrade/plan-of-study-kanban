    // Function to find the column number of the prerequisite
  const findPreReqColumn = (preReqCode, subjects) => {
    const preReqSubject = subjects.find(subj => subj.courseCode === preReqCode);
    return preReqSubject ? preReqSubject.column : -1;
  };
  
  // Function to check column validation
  export const validateSubjectColumns = (subjects) => {
    subjects.forEach(subject => {
      const { courseCode, column, preRequisite } = subject;
  
      // Skip subjects with no prerequisites
      if (preRequisite === "None") return;
  
      const preReqColumn = findPreReqColumn(preRequisite, subjects);
  
      if (preReqColumn === -1) {
        console.log(`Error: Prerequisite ${preRequisite} for ${courseCode} not found.`);
      } else if (column <= preReqColumn) {
        console.log(`Error: ${courseCode} is scheduled in the same or an earlier semester (column ${column}) than its prerequisite ${preRequisite} (column ${preReqColumn}).`);
      }
    });
  };

  