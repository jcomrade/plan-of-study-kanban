import { StudentCard } from "./studentCard";
import styles from "@/styles/student.module.scss";
export const StudentList = () => {
  return (
    <div style={{ width: "100%" }}>
       <p className={styles.Title}>Registration Advisees List</p>
      <div className={styles.list}>
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
        <StudentCard />
      </div>
    </div>
  );
};
