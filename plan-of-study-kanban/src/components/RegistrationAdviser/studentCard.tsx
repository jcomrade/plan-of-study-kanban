import styles from "@/styles/studentCard.module.scss";
import Link from "next/link";
export const StudentCard = () => {
  return (
      <Link className={styles.studentCard} href="/studyplan/2021-06005/plan">
        <div className={styles.studentName}>Jessier Joram Adriel A. Canal</div>
        <div className={styles.studentNumber}>2021-06005</div>
      </Link>
  );
};
