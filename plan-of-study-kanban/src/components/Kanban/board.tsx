import { useState } from "react";
import Column from "./column";
import styles from "../../styles/global.module.scss";
import { generateAcademicYears } from "@/utils/generateAcademicyears";
export const Board = () => {
    const [subjectCards, setSubjectCards] = useState(DEFAULT_CARDS.subjects);
    const [studentData, setStudentData] = useState(DEFAULT_CARDS.student);
  
    return (
      <>
        <div className={styles.myClass}>
          {generateAcademicYears(studentData.maximumResidency).map(
            (semester, index) => {
              return (
                <Column
                  key={index}
                  title={semester}
                  column={index}
                  headingColor="text-neutral-500"
                  cards={subjectCards}
                  setCards={setSubjectCards}
                />
              );
            }
          )}
        </div>
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
        courseDescription: "Introduction to Data Structures",
        id: "1",
        column: 0,
        units: 3,
        courseCode: "CMSC 124",
        status: "Passed",
        preRequisite: "CMSC 123"
      },
      {
        courseDescription: "Introduction to Computer Science",
        id: "2",
        column: 0,
        units: 3,
        courseCode: "CMSC 101",
        status: "Passed",
        preRequisite: "None"
      },
      {
        courseDescription: "Operating Systems Concepts",
        id: "3",
        column: 0,
        units: 3,
        courseCode: "CMSC 130",
        status: "Passed",
        preRequisite: "CMSC 124"
      },
      {
        courseDescription: "Database Management Systems",
        id: "4",
        column: 0,
        units: 3,
        courseCode: "CMSC 127",
        status: "Passed",
        preRequisite: "CMSC 124"
      },
      {
        courseDescription: "Software Engineering Principles",
        id: "5",
        column: 1,
        units: 3,
        courseCode: "CMSC 128",
        status: "Passed",
        preRequisite: "CMSC 130"
      },
      {
        courseDescription: "Computer Networks",
        id: "6",
        column: 1,
        units: 3,
        courseCode: "CMSC 132",
        status: "Passed",
        preRequisite: "CMSC 130"
      },
      {
        courseDescription: "Theory of Computation",
        id: "7",
        column: 1,
        units: 3,
        courseCode: "CMSC 135",
        status: "Passed",
        preRequisite: "CMSC 124"
      },
      {
        courseDescription: "Artificial Intelligence",
        id: "8",
        column: 2,
        units: 3,
        courseCode: "CMSC 141",
        status: "Passed",
        preRequisite: "CMSC 124"
      },
      {
        courseDescription: "Web Development",
        id: "9",
        column: 2,
        units: 3,
        courseCode: "CMSC 150",
        status: "Passed",
        preRequisite: "CMSC 127"
      },
      {
        courseDescription: "Mobile Application Development",
        id: "10",
        column: 3,
        units: 3,
        courseCode: "CMSC 151",
        status: "Passed",
        preRequisite: "CMSC 150"
      },
    ],
  };

export default Board;