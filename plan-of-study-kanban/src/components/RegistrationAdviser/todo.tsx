import { StudentCard } from "./studentCard";
import styles from "@/styles/student.module.scss";
export const TodoList = () => {
  return (
    <div style={{ width: "100%" }}>
      <p className={styles.Title}>Todo</p>
      <div className={styles.TodoList}>
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
