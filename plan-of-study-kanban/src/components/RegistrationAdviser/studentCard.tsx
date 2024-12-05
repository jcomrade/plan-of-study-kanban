import student from "@/styles/student.module.scss";
import Link from "next/link";
export const StudentCard = () => {
  return (
      <Link className={student.student_details} href="/student/2021-06005/draft">
        <div className={student.studentName}>Jessier Joram Adriel A. Canal</div>
        <div className={student.studentNumber}>2021-06005</div>
      </Link>
  );
};
