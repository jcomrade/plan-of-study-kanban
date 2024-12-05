import styles from "@/styles/admin.module.scss";
export default function Admin() {
  return (
    <div className={styles.admin}>
      <div>
        <h1>Update Semester :</h1>
        <div className={styles.flexRowCenter}>
          <p className={styles.title}>Current Semester : </p>
          <p className={styles.currentSemester}>{"2nd Semester AY 20-21"}</p>
        </div>
        <div className={styles.flexRowCenter}>
          <p className={styles.title}>Status : </p>
          <p className={styles.currentSemester}>{"Ongoing"}</p>
        </div>
        <div className={styles.semesterButtons}>
          <button>End Current Semester</button>
          <button>Start Next Semester</button>
        </div>
      </div>
      <div>
        <h1>Upload New Students :</h1>
        <div>
          <input type="file" />
        </div>
      </div>
      <div>
        <h1>Upload New Registration Advisers :</h1>
        <div>
          <input type="file" />
        </div>
      </div>
    </div>
  );
}
