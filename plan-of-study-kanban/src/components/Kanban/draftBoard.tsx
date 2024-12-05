import { useEffect, useState } from "react";
import Column from "./column";
import styles from "@/styles/global.module.scss";
import { generateAcademicYears } from "@/utils/generateAcademicyears";
import { green } from "@mui/material/colors";
import { getCookie } from "typescript-cookie";
import {
  updateColumnsByConflictingPreRequisite,
  updateColumnsByFailedSubjects,
  updateColumnsByConflictingCoRequisite
} from "@/utils/adjust";

type Subject = {
  preRequisite: string[];
  courseCode: string;
  column: number;
  id: string;
  units: number;
  courseDescription: string;
  coRequisite: string[];
  status: string;
};

type StudentData = {
  PK: string;
  subjects: Subject[];
  SK: string;
  draftStatus: string;
  current_semester: string;
};

type StudentDataProps = {
  data: StudentData;
  editable: boolean;
};

// Find the column of a given course code (either prerequisite or co-requisite)
const findSubjectColumn = (courseCode: string, subjects: any) => {
  const subject = subjects.find(
    (subj: any) =>
      subj.courseCode === courseCode &&
      !(subj.status == "Passed" || subj.status == "Failed")
  );
  return subject ? subject.column : -1;
};

const submitDraft = async (subjectList: any, status: any, studentData: any) => {
  let subjects = subjectList;
  // const filteredSubjects = subjects.map(({ error, ...subject }:any) => subject);
  // const idToken = getCookie("id_token")
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_UR}/draft`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `${idToken}`
  //       },
  //       body: JSON.stringify({
  //         PK: studentData.PK,
  //         SK: studentData.SK,
  //         subjects: filteredSubjects,
  //         draftStatus: status
  //       }),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return subjectList;
  // }
};

export const Board: React.FC<StudentDataProps> = ({ data, editable }) => {
  const [subjectCards, setSubjectCards] = useState(
    data.subjects.map((subject: any, _, self) => {
      const { courseCode, column, preRequisite, coRequisite } = subject;
      let errorPrerequisite = false;
      let errorCorequisite = false;
      let error = null;
      // If no prerequisites or co-requisites, no error
      if (preRequisite.length === 0 && coRequisite.length === 0) {
        return { ...subject, errorPrerequisite, errorCorequisite, error };
      }

      // Handle multiple prerequisites
      const invalidPreReqs = preRequisite.filter((preReqCode: string) => {
        const preReqColumn = findSubjectColumn(preReqCode, self);
        return column <= preReqColumn; // Invalid if scheduled in the same or earlier column
      });

      // Handle multiple co-requisites
      const invalidCoReqs = coRequisite.filter((coReqCode: string) => {
        const coReqColumn = findSubjectColumn(coReqCode, self);
        return column !== coReqColumn; // Invalid if not scheduled in the same column
      });
      let errorMessage = null;
      // Construct JSX-based error messages for invalid prerequisites and co-requisites
      if (invalidPreReqs.length > 0) {
        errorPrerequisite = true;
        errorMessage = (
          <div>
            Error: <strong>{courseCode}</strong> is scheduled in an earlier or
            same semester as its prerequisite(s):{" "}
            <strong>{invalidPreReqs.join(", ")}</strong>.
          </div>
        );
      }
      if (invalidCoReqs.length > 0) {
        errorCorequisite = true;
        errorMessage = (
          <div>
            {errorMessage}
            Error: <strong>{courseCode}</strong> must be scheduled in the same
            semester as its co-requisite(s):{" "}
            <strong>{invalidCoReqs.join(", ")}</strong>.
          </div>
        );
      }
      return {
        ...subject,
        errorPrerequisite,
        errorCorequisite,
        error: errorMessage,
      };
    })
  );
  const [studentProperties, setStudentProperties] = useState({
    PK: data.PK,
    SK: data.SK,
  });
  const [draftStatus, setDraftStatus] = useState(data.draftStatus);
  const [studentData, setStudentData] = useState(DEFAULT_CARDS.student);
  // Function to validate subject columns
  const validateSubjectColumns = (subjects: any) => {
    const updatedSubjects = subjects.map((subject: any, _: any, self: any) => {
      const { courseCode, column, preRequisite, coRequisite } = subject;
      let errorPrerequisite = false;
      let errorCorequisite = false;
      let error = null;
      // If no prerequisites or co-requisites, no error
      if (preRequisite.length === 0 && coRequisite.length === 0) {
        return { ...subject, errorPrerequisite, errorCorequisite, error };
      }

      // Handle multiple prerequisites
      const invalidPreReqs = preRequisite.filter((preReqCode: string) => {
        const preReqColumn = findSubjectColumn(preReqCode, subjects);
        return column <= preReqColumn; // Invalid if scheduled in the same or earlier column
      });

      // Handle multiple co-requisites
      const invalidCoReqs = coRequisite.filter((coReqCode: string) => {
        const coReqColumn = findSubjectColumn(coReqCode, subjects);
        return column !== coReqColumn; // Invalid if not scheduled in the same column
      });
      let errorMessage = null;
      // Construct JSX-based error messages for invalid prerequisites and co-requisites
      if (invalidPreReqs.length > 0) {
        errorPrerequisite = true;
        errorMessage = (
          <div>
            Error: <strong>{courseCode}</strong> is scheduled in an earlier or
            same semester as its prerequisite(s):{" "}
            <strong>{invalidPreReqs.join(", ")}</strong>.
          </div>
        );
      }
      if (invalidCoReqs.length > 0) {
        errorCorequisite = true;
        errorMessage = (
          <div>
            {errorMessage}
            Error: <strong>{courseCode}</strong> must be scheduled in the same
            semester as its co-requisite(s):{" "}
            <strong>{invalidCoReqs.join(", ")}</strong>.
          </div>
        );
      }
      
      return {
        ...subject,
        errorPrerequisite,
        errorCorequisite,
        error: errorMessage,
      };
    });
    setSubjectCards(updatedSubjects); // Update the state with the validated subjects
  };

  return (
    <>
      <div className={styles.myClass}>
        {generateAcademicYears(studentData.maximumResidency).map(
          (semester, index) => {
            return (
              <Column
                key={semester}
                currentSemester={data.current_semester}
                title={semester}
                column={index}
                headingColor="text-neutral-500"
                cards={subjectCards}
                setCards={validateSubjectColumns} // Pass the setter so child components can trigger updates
              />
            );
          }
        )}
      </div>
      <button
        style={{
          padding: 10,
          backgroundColor: "green",
          fontSize: 30,
          marginLeft: 1000,
        }}
        onClick={async () => {
          switch (draftStatus) {
            case "requesting_authorization":
            case "draft_for_approval":
              return;
            default:
              break;
          }
          const newDraft = await submitDraft(
            subjectCards,
            draftStatus,
            studentProperties
          );
          setDraftStatus(newDraft.draftStatus);
          setSubjectCards(subjectCards);
        }}
      >
        {(function (status) {
          switch (status) {
            case "granted_authorization":
              return "SUBMIT DRAFT";
            case "draft_for_approval":
              return "AWAITING APPROVAL";
            case "unauthorized":
              return "REQUEST ACCESS";
            case "requesting_authorization":
              return "AWAITING APPROVAL";
              break;
          }
        })(draftStatus)}
      </button>
      <button
        onClick={() =>
          validateSubjectColumns(updateColumnsByFailedSubjects(subjectCards))
        }
      >
        adjust by failed
      </button>
      <button
        onClick={() =>
          validateSubjectColumns(
            updateColumnsByConflictingPreRequisite(subjectCards)
          )
        }
      >
        adjust by conflicts
      </button>
      <button
        onClick={() =>
          validateSubjectColumns(
            updateColumnsByConflictingCoRequisite(subjectCards)
          )
        }
      >
        adjust by conflicts
      </button>
    </>
  );
};

const DEFAULT_CARDS = {
  student: {
    id: "2021-06005",
    maximumResidency: 7,
    registrationAdviser: "1234-1234",
  },
  subjects: [
    {
      courseDescription: "Algebra and Trigonometry",
      id: "1",
      column: 0,
      units: 3,
      courseCode: "MATH 17",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Introduction to Web Design",
      id: "2",
      column: 0,
      units: 3,
      courseCode: "CMSC 3",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Introduction to Computer Science",
      id: "3",
      column: 0,
      units: 3,
      courseCode: "CMSC 10",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Computer Programming I",
      id: "4",
      column: 0,
      units: 3,
      courseCode: "CMSC 18",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription:
        "Discrete Mathematical Structures in Computer Science I",
      id: "5",
      column: 0,
      units: 3,
      courseCode: "CMSC 56",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Foundations of Physical Fitness",
      id: "6",
      column: 0,
      units: 3,
      courseCode: "PE 1",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription:
        "CWTS DHK - National Service Training Program-Civic Welfare Training Service 1",
      id: "7",
      column: 0,
      units: 3,
      courseCode: "NSTP 1",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Analytic Geometry and Calculus I",
      id: "8",
      column: 1,
      units: 3,
      courseCode: "MATH 26",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Web-based System Development",
      id: "9",
      column: 1,
      units: 3,
      courseCode: "CMSC 126",
      status: "Passed",
      preRequisite: ["CMSC 3", "CMSC 18"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Computer Programming II: Object Oriented Programming",
      id: "10",
      column: 1,
      units: 3,
      courseCode: "CMSC 28",
      status: "Passed",
      preRequisite: ["CMSC 10", "CMSC 18"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Logic Design and Digital Computer Circuits",
      id: "11",
      column: 1,
      units: 3,
      courseCode: "CMSC 130",
      status: "Passed",
      preRequisite: ["CMSC 56"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription:
        "Discrete Mathematical Structures in Computer Science II",
      id: "12",
      column: 1,
      units: 3,
      courseCode: "CMSC 57",
      status: "Passed",
      preRequisite: ["CMSC 56"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Elementary Statistics",
      id: "13",
      column: 1,
      units: 3,
      courseCode: "STAT 1",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Stretching",
      id: "14",
      column: 1,
      units: 3,
      courseCode: "PE 2",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription:
        "CWTS DHK - National Service Training Program-Civic Welfare Training Service 2",
      id: "16",
      column: 1,
      units: 3,
      courseCode: "NSTP 2",
      status: "Passed",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Analytic Geometry and Calculus II",
      id: "17",
      column: 3,
      units: 3,
      courseCode: "MATH 27",
      status: "Ongoing",
      preRequisite: ["MATH 26"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription:
        "Computer Organization & Architecture with Assembly Language Programming",
      id: "18",
      column: 3,
      units: 3,
      courseCode: "CMSC 133",
      status: "Ongoing",
      preRequisite: ["CMSC 18", "CMSC 130"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Data Structures and Applications",
      id: "19",
      column: 3,
      units: 3,
      courseCode: "CMSC 122",
      status: "Ongoing",
      preRequisite: ["CMSC 18", "CMSC 57"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Statistical Methods and Experimental Design",
      id: "20",
      column: 3,
      units: 3,
      courseCode: "AMAT 131",
      status: "Ongoing",
      preRequisite: ["STAT 1"],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Gymnastics",
      id: "21",
      column: 3,
      units: 3,
      courseCode: "PE 3",
      status: "Ongoing",
      preRequisite: [],
      coRequisite: [], // Now an array
    },
    {
      courseDescription: "Mindanao Studies 1",
      id: "22",
      column: 3,
      units: 3,
      courseCode: "GE 2",
      status: "Ongoing",
      preRequisite: [],
      coRequisite: ["GE 3"], // Now an array
    },
    {
      courseDescription: "Critical Perspectives in Communication",
      id: "23",
      column: 3,
      units: 3,
      courseCode: "GE 3",
      status: "Ongoing",
      preRequisite: ["PE 2"],
      coRequisite: ["GE 2"], // Now an array
    },
  ],
};
export default Board;
